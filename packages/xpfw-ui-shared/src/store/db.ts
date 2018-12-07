import { FormStore, LoadingStore } from "@xpfw/form-shared"
import { IForm } from "@xpfw/validate"
import { get, isEqual, isNil, set } from "lodash"
import { autoSubscribe, AutoSubscribeStore, key, StoreBase } from "resub"
import { IPersistableStore } from "resub-persist"
import BackendClient from "../client"
import UserStore from "./user"

export interface IResult {
  result?: any
  error?: any
  loading?: boolean
}

const FETCH_THRESHOLD = 1000 * 60 * 3

const REMOVE_ADDON_KEY = "remove"

@AutoSubscribeStore
export class DbStore extends StoreBase implements IPersistableStore {
  public name = "adminStore"
  private createState: {[index: string]: IResult | undefined} = {}
  private removeState: {[index: string]: IResult | undefined} = {}
  private updateState: {[index: string]: IResult | undefined} = {}
  private getState: {[index: string]: {[index: string]: IResult | undefined}} = {}
  private lastFetch: {[index: string]: number} = {}
  private fetching: {[index: string]: boolean} = {}
  private currentlyEditing: string = ""

  public getPropKeys() { return ["createState", "updateState", "getState"] }

  public async create(form: IForm, prefix: string = "") {
    const saveResultAt = `${prefix && prefix.length > 0 ? prefix + "." : ""}${form.model}`
    try {
      const data = FormStore.getFormData(form, prefix)
      if (get(form, "options.addCreatedAt", false)) {
        data.createdAt = new Date()
      }
      if (get(form, "options.addBelongsTo", false)) {
        data.belongsTo = get(UserStore.getUser(), get(form, "options.idPath", "id"))
      }
      LoadingStore.setLoading(saveResultAt, true)
      this.trigger(saveResultAt)
      const col: any = form.collection
      const result = await BackendClient.client.create(col, data)
      const res = {result}
      this.createState[saveResultAt] = res
      LoadingStore.setLoading(saveResultAt, false)
      this.trigger(saveResultAt)
      return res
    } catch (error) {
      const res = {error}
      this.createState[saveResultAt] = res
      LoadingStore.setLoading(saveResultAt, false)
      this.trigger(saveResultAt)
      return res
    }
  }

  public async patch(id: string, form: IForm, prefix: string = "") {
    const saveResultAt = `${prefix && prefix.length > 0 ? prefix + "." : ""}${id}${form.model}`
    try {
      LoadingStore.setLoading(saveResultAt, true)
      this.trigger(saveResultAt)
      const col: any = form.collection
      const result = await BackendClient.client.patch(col, id, FormStore.getFormData(form, prefix))
      const res = {result}
      this.updateState[saveResultAt] = res
      LoadingStore.setLoading(saveResultAt, false)
      this.trigger(saveResultAt)
      if (isNil(this.getState[col])) {
        this.getState[col] = {}
      }
      this.getState[col][id] = res
      this.trigger(id)
      return res
    } catch (error) {
      const res = {error}
      this.updateState[saveResultAt] = res
      LoadingStore.setLoading(saveResultAt, false)
      this.trigger(saveResultAt)
      return res
    }
  }

  @autoSubscribe
  public getGetState(@key id: string, collection: string, tryFetch: boolean) {
    if (tryFetch) {
      const thisRef: any = this
      setTimeout(() => thisRef.getFromServer(id, collection), 1)
    }
    return this.getState[collection] ? this.getState[collection][id] : undefined
  }

  public setItem(id: string, collection: string, object: any) {
    if (!this.getState[collection]) {
      this.getState[collection] = {}
    }
    this.getState[collection][id] = object
    this.lastFetch[id] = Date.now()
    this.trigger(id)
  }

  @autoSubscribe
  public getEditOriginal(@key id: string, form: IForm, prefix: string = "", returnFetchPromise?: boolean) {
    const collection: any = get(form, "collection")
    if (this.currentlyEditing !== id) {
      this.currentlyEditing = id
      const fetchPromise = this.getFromServer(id, collection).then((res) => {
        const doc = isNil(res) ? this.getState[collection][id] : res
        FormStore.copyDocToFormData(get(doc, "result"), form, prefix)
        this.trigger(id)
        return doc
      })
      if (returnFetchPromise) {
        return fetchPromise
      }
    }
    const result = this.getState[collection] ? this.getState[collection][id] : undefined
    return returnFetchPromise ? Promise.resolve(result) : result
  }

  public setCreateState(model: string, value: any) {
    this.createState[model] = value
    this.trigger(model)
    return
  }

  @autoSubscribe
  public getCreateState(@key model: string) {
    return this.createState[model]
  }

  public setUpdateState(model: string, value: any) {
    this.updateState[model] = value
    this.trigger(model)
    return
  }

  @autoSubscribe
  public getUpdateState(@key model: string) {
    return this.updateState[model]
  }

  @autoSubscribe
  public getRemoveState(@key id: string) {
    return this.removeState[id]
  }

  @autoSubscribe
  public get(@key id: string, collection: string, returnFetchPromise?: boolean) {
    // todo: dont always call this first
    const fetchPromise = this.getFromServer(id, collection)
    return returnFetchPromise ? fetchPromise : this.getState[collection][id]
  }

  public async getFromServer(id: string, collection: string) {
    if (this.getState[collection] && this.getState[collection][id]) {
      if (this.lastFetch[id] && Date.now() - this.lastFetch[id] < FETCH_THRESHOLD) {
        return this.getState[collection][id]
      }
    }
    if (this.fetching[id] === true) {
      return
    }
    this.getState = {...this.getState}
    if (isNil(this.getState[collection])) {
      this.getState[collection] = {}
    }
    try {
      this.fetching[id] = true
      LoadingStore.setLoading(id, true)
      const result = await BackendClient.client.get(collection, id)
      this.lastFetch[id] = Date.now()
      const res = {result}
      const isNew = !isEqual(res, this.getState[collection][id])
      this.getState[collection][id] = res
      LoadingStore.setLoading(id, false)
      if (isNew) {
        this.trigger(id)
      }
      this.fetching[id] = false
      return res
    } catch (error) {
      LoadingStore.setLoading(id, false)
      const res = {error}
      const isNew = !isEqual(res, this.getState[collection][id])
      this.getState[collection][id] = res
      if (isNew) {
        this.trigger(id)
      }
      this.fetching[id] = false
      return res
    }
  }

  public async remove(id: string, collection: string) {
    this.getState = {...this.getState}
    if (isNil(this.getState[collection])) {
      this.getState[collection] = {}
    }
    try {
      LoadingStore.setLoading(REMOVE_ADDON_KEY + id, true)
      this.trigger(id)
      const result = await BackendClient.client.remove(collection, id)
      const res = {result}
      this.removeState[id] = res
      delete this.getState[collection][id]
      LoadingStore.setLoading(REMOVE_ADDON_KEY + id, false)
      this.trigger(id)
      return res
    } catch (error) {
      const res = {error}
      this.removeState[id] = res
      LoadingStore.setLoading(REMOVE_ADDON_KEY + id, false)
      this.trigger(id)
      return res
    }
  }

}

export default new DbStore()
export {
  REMOVE_ADDON_KEY
}
