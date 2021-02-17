import { ExtendedJSONSchema, FormStore, getMapTo, prependPrefix, useModifier } from "@xpfw/form"
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

  public makeQuery = flow(function *(this: ListStore, schema: ExtendedJSONSchema, mapTo?: string, prefix: string = "", queryObj?: any) {
    mapTo = getMapTo(schema, mapTo)
    const getAt = prependPrefix(mapTo, prefix)
    let qKey: any
    if (queryObj == null) {
      queryObj = yield this.buildQueryObj(schema, mapTo, prefix)
    }
    qKey = `${JSON.stringify(schema.multiCollection)}${schema.collection}${JSON.stringify(queryObj)}`
    if (this.doingQuery[qKey] == null) {
      const thisRef = this
      const q = flow(function *(this: ListStore) {
        try {
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
            thisRef.maxPage[getAt] = Math.ceil(biggestTotal / thisRef.pageSize)
            const retObj = {data: resList, total: biggestTotal, limit: queryObj.$limit, skip: queryObj.$skip}
            thisRef.lists[getAt] = retObj
            delete thisRef.doingQuery[qKey]
            FormStore.setLoading(getAt, false)
            return retObj
          } else {
            const col: any = schema.collection
            const result = yield BackendClient.client.find(col, queryObj)
            const total = Math.max(get(result, "total", 1), 1)
            thisRef.maxPage[getAt] = Math.ceil(total / thisRef.pageSize)
            thisRef.lists[getAt] = result
            delete thisRef.doingQuery[qKey]
            FormStore.setLoading(getAt, false)
            return result
          }
        } catch (error) {
          delete thisRef.doingQuery[qKey]
          FormStore.setError(getAt, error)
          FormStore.setLoading(getAt, false)
          return error
        }
      })()
      this.doingQuery[qKey] = q
    }
    const r: any = this.doingQuery[qKey]
    return r
  })

  @observable
  private lists: {[index: string]: any} = {}
  @observable
  private currentPage: {[index: string]: number} = {}
  @observable
  private maxPage: {[index: string]: number} = {}
  @observable
  private doingQuery: {[index: string]: Promise<any> | undefined} = {}

  public getList(schema: ExtendedJSONSchema, mapTo?: string, prefix: string = "", awaitQuery?: boolean) {
    mapTo = getMapTo(schema, mapTo)
    const getAt = prependPrefix(mapTo, prefix)
    const asyncTask = async () => {
      const queryObj = await this.buildQueryObj(schema, mapTo, prefix)
      const equalToPreviousQuery = isEqual(queryObj, this.previousQuery[getAt])
      const collectionDirty = this.getIsDirty(schema)
      if (this.lists[getAt] == null || awaitQuery || !equalToPreviousQuery || collectionDirty) {
        this.previousQuery[getAt] = queryObj
        this.setCollectionDirty(String(schema.collection), false)
        return this.makeQuery(schema, mapTo, prefix, queryObj)
      }
      return Promise.resolve()
    }
    const promise = asyncTask()
    if (awaitQuery) {
      return promise
    }
    return this.lists[getAt]
  }

  @action
  public setCollectionDirty(collection: string, value: boolean) {
    this.dirtyCollections[collection] = value
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
    if (isNumber(this.maxPage[getAt]) && pageNumber >= this.maxPage[getAt]) {
      pageNumber = this.maxPage[getAt] - 1
    }
    if (pageNumber < 0) {
      pageNumber = 0
    }
    this.currentPage[getAt] = pageNumber
    return this.makeQuery(schema, mapTo, prefix)
  }

  public async buildQueryObj(schema: ExtendedJSONSchema, mapTo?: string, prefix: string = "", noDynamicNums?: boolean) {
    mapTo = getMapTo(schema, mapTo)
    const getAt = prependPrefix(mapTo, prefix)
    let queryObj: any = FormStore.getValue(mapTo, prefix, {})
    queryObj = toJS(queryObj)
    queryObj = {...queryObj}
    const currentPage = this.getCurrentPage(getAt)
    if (!noDynamicNums && isNil(queryObj.$limit)) {
        queryObj.$limit = this.pageSize
    }
    if (!noDynamicNums && isNil(queryObj.$skip)) {
        queryObj.$skip = queryObj.$limit * currentPage
    }
    queryObj = await useModifier(queryObj, schema, "find")
    return queryObj
  }

}

export default new ListStore()
