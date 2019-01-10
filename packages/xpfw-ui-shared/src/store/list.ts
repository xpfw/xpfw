import { FormStore, LoadingStore } from "@xpfw/form-shared"
import { IForm } from "@xpfw/validate"
import { get, isNil, isNumber, isObject, set } from "lodash"
import { autoSubscribe, AutoSubscribeStore, key, StoreBase } from "resub"
import { IPersistableStore } from "resub-persist"
import BackendClient from "../client"
import { IResult } from "./db"

const FETCH_THRESHOLD = 1000 * 60 * 3

@AutoSubscribeStore
export class ListStore extends StoreBase implements IPersistableStore {
  public name = "listStore"
  public pageSize: number = 10
  private lists: {[index: string]: IResult} = {}
  private currentPage: {[index: string]: number} = {}
  private maxPage: {[index: string]: number} = {}
  private doingQuery: {[index: string]: boolean} = {}

  public getPropKeys() { return ["lists"] }

  @autoSubscribe
  public getList(@key getKey: string, form: IForm, prefix: string = "", awaitQuery?: boolean) {
    if (isNil(this.lists[getKey]) || awaitQuery) {
      const promise = this.makeQuery(form, prefix)
      if (awaitQuery) {
        return promise
      }
    }
    return this.lists[getKey]
  }

  @autoSubscribe
  public getCurrentPage(@key index: string) {
    return isNumber(this.currentPage[index]) ? this.currentPage[index] : 0
  }

  @autoSubscribe
  public getMaxPage(@key index: string) {
    return isNumber(this.maxPage[index]) ? this.maxPage[index] : 1
  }

  public resetPage(form: IForm, prefix: string = "") {
    const getAt = `${prefix && prefix.length > 0 ? prefix + "." : ""}${form.model}`
    this.currentPage[getAt] = 0
  }

  public async nextPage(form: IForm, prefix: string = "") {
    const getAt = `${prefix && prefix.length > 0 ? prefix + "." : ""}${form.model}`
    return this.searchInPage(form, prefix, isNumber(this.currentPage[getAt]) ? this.currentPage[getAt] + 1 : 1)
  }

  public async prevPage(form: IForm, prefix: string = "") {
    const getAt = `${prefix && prefix.length > 0 ? prefix + "." : ""}${form.model}`
    return this.searchInPage(form, prefix, isNumber(this.currentPage[getAt]) ? this.currentPage[getAt] - 1 : 0)
  }

  public async searchInPage(form: IForm, prefix: string = "", pageNumber: number) {
    const getAt = `${prefix && prefix.length > 0 ? prefix + "." : ""}${form.model}`
    if (isNumber(this.maxPage[getAt]) && pageNumber > this.maxPage[getAt]) {
      pageNumber = this.maxPage[getAt] - 1
    }
    if (pageNumber < 0) {
      pageNumber = 0
    }
    this.currentPage[getAt] = pageNumber
    return this.makeQuery(form, prefix)
  }

  public buildQueryObj(form: IForm, prefix: string = "") {
    const getAt = `${prefix && prefix.length > 0 ? prefix + "." : ""}${form.model}`
    const queryBuilder: any = get(form, "options.queryBuilder", FormStore.getFormData)
    const queryObj: any = queryBuilder.apply(FormStore, [form, prefix, "find"])
    const currentPage = this.getCurrentPage(getAt)
    if (isNil(queryObj.$limit)) {
        queryObj.$limit = this.pageSize
    }
    if (isNil(queryObj.$skip)) {
        queryObj.$skip = queryObj.$limit * currentPage
    }
    if (isNil(queryObj.$sort)) {
        queryObj.$sort = get(form, "options.defaultSort", { createdAt: -1 })
    }
    return queryObj
  }

  public async makeQuery(form: IForm, prefix: string = "") {
    const getAt = `${prefix && prefix.length > 0 ? prefix + "." : ""}${form.model}`
    let qKey
    try {
      const queryObj = this.buildQueryObj(form, prefix)
      qKey = `${JSON.stringify(form.multiCollection)}${form.collection}${JSON.stringify(queryObj)}`
      if (!this.doingQuery[qKey]) {
        this.doingQuery[qKey] = true
        LoadingStore.setLoading(getAt, true)
        if (Array.isArray(form.multiCollection)) {
          const resList: any[] = []
          const promises: any[] = []
          let biggestTotal = 0
          for (const col of form.multiCollection) {
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
                e.fromCollection = form.multiCollection[i]
                resList.push(e)
              }
            }
            i++
          }
          this.maxPage[getAt] = Math.ceil(biggestTotal / this.pageSize)
          this.lists[getAt] = {result: resList}
          LoadingStore.setLoading(getAt, false)
          this.trigger(getAt)
          this.doingQuery[qKey] = false
          return {result: resList, total: biggestTotal, limit: queryObj.$limit, skip: queryObj.$skip}
        } else {
          const col: any = form.collection
          const result = await BackendClient.client.find(col, queryObj)
          const total = get(result, "total", 1)
          this.maxPage[getAt] = Math.ceil(total / this.pageSize)
          const returnedResult: any = {
            result: get(result, "data"), total,
            limit: get(result, "limit", 1),
            skip: get(result, "skip", 1)
          }
          this.lists[getAt] = returnedResult
          this.trigger(getAt)
          this.doingQuery[qKey] = false
          LoadingStore.setLoading(getAt, false)
          return returnedResult
        }
      } else {
        return Promise.resolve(false)
      }
    } catch (error) {
      this.lists[getAt] = {error}
      this.trigger(getAt)
      this.doingQuery[qKey] = false
      LoadingStore.setLoading(getAt, false)
      return {error}
    }
  }

}

export default new ListStore()
