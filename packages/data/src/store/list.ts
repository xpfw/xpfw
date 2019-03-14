import { ExtendedJSONSchema, FormStore, getMapTo, prependPrefix } from "@xpfw/form"
import { get, isEqual, isNil, isNumber } from "lodash"
import { action, flow, observable, toJS } from "mobx"
import BackendClient from "../client"

export class ListStore {
  @observable
  public pageSize: number = 10
  public previousQuery: {[index: string]: any} = {}
  /**
   * Used by DbStore after create or update to signalize that new records could be gathered by a fetch
   */
  @observable
  public dirtyCollections: {[index: string]: boolean | undefined} = {}

  public makeQuery = flow(function *(this: ListStore, schema: ExtendedJSONSchema, mapTo?: string, prefix: string = "") {
    mapTo = getMapTo(schema, mapTo)
    const getAt = prependPrefix(mapTo, prefix)
    let qKey: any
    try {
      const queryObj = this.buildQueryObj(schema, mapTo, prefix)
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
            const promiseRes: any = yield promise
            if (promiseRes != null) {
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
          const retObj = {data: resList, total: biggestTotal, limit: queryObj.$limit, skip: queryObj.$skip}
          this.lists[getAt] = retObj
          FormStore.setLoading(getAt, false)
          this.doingQuery[qKey] = false
          return retObj
        } else {
          const col: any = schema.collection
          const result = yield BackendClient.client.find(col, queryObj)
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
  })

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
    const getAt = prependPrefix(mapTo, prefix)
    const queryObj = this.buildQueryObj(schema, mapTo, prefix)
    const equalToPreviousQuery = isEqual(queryObj, this.previousQuery[getAt])
    const collectionDirty = this.getIsDirty(schema)
    if (this.lists[getAt] == null || awaitQuery || !equalToPreviousQuery || collectionDirty) {
      this.previousQuery[getAt] = queryObj
      const promise = this.makeQuery(schema, mapTo, prefix)
      if (awaitQuery) {
        return promise
      }
    }
    return this.lists[getAt]
  }

  @action
  public setCollectionDirty(collection: string) {
    this.dirtyCollections[collection] = true
  }

  public getIsDirty(schema: ExtendedJSONSchema) {
    if (Array.isArray(schema.multiCollection)) {
      for (const collection of schema.multiCollection) {
        if (this.dirtyCollections[String(collection)] === true) {
          return true
        }
      }
      return false
    }
    return this.dirtyCollections[String(schema.collection)] === true
  }

  public getCurrentPage(index: string) {
    return isNumber(this.currentPage[index]) ? this.currentPage[index] : 0
  }

  public getMaxPage(index: string) {
    return isNumber(this.maxPage[index]) ? this.maxPage[index] : 1
  }

  @action
  public resetPage(schema: ExtendedJSONSchema, mapTo?: string, prefix: string = "") {
    const getAt = prependPrefix(getMapTo(schema, mapTo), prefix)
    this.currentPage[getAt] = 0
  }

  @action
  public async nextPage(schema: ExtendedJSONSchema, mapTo?: string, prefix: string = "") {
    const getAt = prependPrefix(getMapTo(schema, mapTo), prefix)
    return this.searchInPage(schema, mapTo, prefix, isNumber(this.currentPage[getAt]) ? this.currentPage[getAt] + 1 : 1)
  }

  @action
  public async prevPage(schema: ExtendedJSONSchema, mapTo?: string, prefix: string = "") {
    const getAt = prependPrefix(getMapTo(schema, mapTo), prefix)
    return this.searchInPage(schema, mapTo, prefix, isNumber(this.currentPage[getAt]) ? this.currentPage[getAt] - 1 : 0)
  }

  @action
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
    const queryModifier: any = get(schema, "modify.queryModifier")
    let queryObj: any = queryBuilder ?
      queryBuilder.apply(FormStore, [schema, mapTo, prefix, "find"]) : FormStore.getValue(mapTo, prefix, {})
    queryObj = toJS(queryObj, {exportMapsAsObjects: false, detectCycles: true, recurseEverything: true})
    if (queryModifier) {
      queryObj = queryModifier(queryObj)
    }
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

}

export default new ListStore()
