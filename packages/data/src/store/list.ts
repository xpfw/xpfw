import { ExtendedJSONSchema, FormStore, getMapTo, prependPrefix } from "@xpfw/form"
import { get, isNil, isNumber, isObject, set } from "lodash-es"
import { action, observable, toJS } from "mobx"
import BackendClient from "../client"

export class ListStore {
  @observable
  public pageSize: number = 10
  @observable
  private lists: {[index: string]: any} = {}
  @observable
  private currentPage: {[index: string]: number} = {}
  @observable
  private maxPage: {[index: string]: number} = {}
  @observable
  private doingQuery: {[index: string]: boolean} = {}

  public getList(schema: ExtendedJSONSchema, mapTo?: string, prefix: string = "", awaitQuery?: boolean) {
    mapTo = getMapTo(schema, mapTo)
    if (isNil(this.lists[mapTo]) || awaitQuery) {
      const promise = this.makeQuery(schema, mapTo, prefix)
      if (awaitQuery) {
        return promise
      }
    }
    return this.lists[mapTo]
  }

  public getCurrentPage(index: string) {
    return isNumber(this.currentPage[index]) ? this.currentPage[index] : 0
  }

  public getMaxPage(index: string) {
    return isNumber(this.maxPage[index]) ? this.maxPage[index] : 1
  }

  public resetPage(schema: ExtendedJSONSchema, mapTo?: string, prefix: string = "") {
    const getAt = prependPrefix(getMapTo(schema, mapTo), prefix)
    this.currentPage[getAt] = 0
  }

  public async nextPage(schema: ExtendedJSONSchema, mapTo?: string, prefix: string = "") {
    const getAt = prependPrefix(getMapTo(schema, mapTo), prefix)
    return this.searchInPage(schema, mapTo, prefix, isNumber(this.currentPage[getAt]) ? this.currentPage[getAt] + 1 : 1)
  }

  public async prevPage(schema: ExtendedJSONSchema, mapTo?: string, prefix: string = "") {
    const getAt = prependPrefix(getMapTo(schema, mapTo), prefix)
    return this.searchInPage(schema, mapTo, prefix, isNumber(this.currentPage[getAt]) ? this.currentPage[getAt] - 1 : 0)
  }

  public async searchInPage(schema: ExtendedJSONSchema, mapTo?: string, prefix: string = "", pageNumber: number = 0) {
    const getAt = prependPrefix(getMapTo(schema, mapTo), prefix)
    if (isNumber(this.maxPage[getAt]) && pageNumber > this.maxPage[getAt]) {
      pageNumber = this.maxPage[getAt] - 1
    }
    if (pageNumber < 0) {
      pageNumber = 0
    }
    this.currentPage[getAt] = pageNumber
    return this.makeQuery(schema, mapTo, prefix)
  }

  public buildQueryObj(schema: ExtendedJSONSchema, mapTo?: string, prefix: string = "", noDynamicNums?: boolean) {
    mapTo = getMapTo(schema, mapTo)
    const getAt = prependPrefix(mapTo, prefix)
    const queryBuilder: any = get(schema, "modify.queryBuilder")
    let queryObj: any = queryBuilder ?
      queryBuilder.apply(FormStore, [schema, mapTo, prefix, "find"]) : FormStore.getValue(mapTo, prefix, {})
    queryObj = toJS(queryObj, {exportMapsAsObjects: false, detectCycles: true, recurseEverything: true})
    const currentPage = this.getCurrentPage(getAt)
    if (!noDynamicNums && isNil(queryObj.$limit)) {
        queryObj.$limit = this.pageSize
    }
    if (!noDynamicNums && isNil(queryObj.$skip)) {
        queryObj.$skip = queryObj.$limit * currentPage
    }
    if (isNil(queryObj.$sort)) {
        queryObj.$sort = get(schema, "modify.defaultSort", { createdAt: -1 })
    }
    return queryObj
  }

  public async makeQuery(schema: ExtendedJSONSchema, mapTo?: string, prefix: string = "") {
    mapTo = getMapTo(schema, mapTo)
    const getAt = prependPrefix(mapTo, prefix)
    let qKey: any
    try {
      const queryObj = this.buildQueryObj(schema, mapTo, prefix)
      console.log("ABOUT TO QUERY WITH", queryObj)
      qKey = `${JSON.stringify(schema.multiCollection)}${schema.collection}${JSON.stringify(queryObj)}`
      if (!this.doingQuery[qKey]) {
        this.doingQuery[qKey] = true
        FormStore.setLoading(getAt, true)
        if (Array.isArray(schema.multiCollection)) {
          const resList: any[] = []
          const promises: any[] = []
          let biggestTotal = 0
          for (const col of schema.multiCollection) {
            promises.push(BackendClient.client.find(col, queryObj))
          }
          let i = 0
          for (const promise of promises) {
            const promiseRes = await promise
            if (isObject(promiseRes)) {
              if (promiseRes.total > biggestTotal) {
                biggestTotal = promiseRes.total
              }
              for (const e of promiseRes.data) {
                e.fromCollection = schema.multiCollection[i]
                resList.push(e)
              }
            }
            i++
          }
          this.maxPage[getAt] = Math.ceil(biggestTotal / this.pageSize)
          this.lists[getAt] = {result: resList}
          FormStore.setLoading(getAt, false)
          this.doingQuery[qKey] = false
          return {result: resList, total: biggestTotal, limit: queryObj.$limit, skip: queryObj.$skip}
        } else {
          const col: any = schema.collection
          const result = await BackendClient.client.find(col, queryObj)
          const total = get(result, "total", 1)
          this.maxPage[getAt] = Math.ceil(total / this.pageSize)
          this.lists[getAt] = result
          this.doingQuery[qKey] = false
          FormStore.setLoading(getAt, false)
          return result
        }
      } else {
        return Promise.resolve(false)
      }
    } catch (error) {
      this.doingQuery[qKey] = false
      FormStore.setError(getAt, error)
      FormStore.setLoading(getAt, false)
      return error
    }
  }

}

export default new ListStore()
