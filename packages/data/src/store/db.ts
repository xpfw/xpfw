import { ExtendedJSONSchema, FormStore, getMapTo, prependPrefix } from "@xpfw/form"
import { get, isEqual, isNil, set } from "lodash-es"
import { action, observable } from "mobx"
import BackendClient from "../client"
import dataOptions from "../options"
import toJS from "../util/toJS"
import UserStore from "./user"

const FETCH_THRESHOLD = 1000 * 60 * 3

const REMOVE_ADDON_KEY = "remove"

export class DbStore {
  @observable
  private createState: {[index: string]: any | undefined} = {}
  @observable
  private removeState: {[index: string]: any | undefined} = {}
  @observable
  private updateState: {[index: string]: any | undefined} = {}
  @observable
  private getState: {[index: string]: {[index: string]: any | undefined}} = {}
  @observable
  private lastFetch: {[index: string]: number} = {}
  @observable
  private fetching: {[index: string]: boolean} = {}
  @observable
  private currentlyEditing: string = ""

  public async create(schema: ExtendedJSONSchema, mapTo?: string, prefix: string = "") {
    mapTo = getMapTo(schema, mapTo)
    const saveResultAt = prependPrefix(mapTo, prefix)
    try {
      const data = FormStore.getValue(mapTo, prefix)
      if (get(schema, "modify.addCreatedAt", false)) {
        data.createdAt = new Date()
      }
      if (get(schema, "modify.addBelongsTo", false)) {
        data.belongsTo = get(UserStore.getUser(), dataOptions.idPath)
      }
      FormStore.setLoading(saveResultAt, true)
      const col: any = schema.collection
      const result = await BackendClient.client.create(col, data)
      this.createState[saveResultAt] = result
      if (this.getState[col] == null) {
        this.getState[col] = {}
      }
      this.getState[col][get(result, dataOptions.idPath)] = result
      FormStore.setLoading(saveResultAt, false)
      return result
    } catch (error) {
      FormStore.setError(saveResultAt, error)
      FormStore.setLoading(saveResultAt, false)
      return error
    }
  }

  public async patch(id: string, schema: ExtendedJSONSchema, mapTo?: string, prefix: string = "") {
    mapTo = getMapTo(schema, mapTo)
    const saveResultAt = `${prependPrefix(mapTo, prefix)}${id}`
    try {
      FormStore.setLoading(saveResultAt, true)
      const col: any = schema.collection
      const result = await BackendClient.client.patch(col, id, toJS(FormStore.getValue(mapTo, prefix)))
      this.updateState[saveResultAt] = result
      FormStore.setLoading(saveResultAt, false)
      if (this.getState[col] == null) {
        this.getState[col] = {}
      }
      this.getState[col][id] = result
      return result
    } catch (error) {
      FormStore.setError(saveResultAt, error)
      FormStore.setLoading(saveResultAt, false)
      return error
    }
  }

  public getGetState(id: string, collection: string, tryFetch: boolean) {
    if (tryFetch) {
      const thisRef: any = this
      setTimeout(() => thisRef.getFromServer(id, collection), 1)
    }
    return this.getState[collection] ? this.getState[collection][id] : undefined
  }

  @action
  public setItem(id: string, collection: string, object: any) {
    if (!this.getState[collection]) {
      this.getState[collection] = {}
    }
    this.getState[collection][id] = object
    this.lastFetch[id] = Date.now()
  }

  public getEditOriginal(id: string, schema: ExtendedJSONSchema, mapTo?: string, prefix: string = "", returnFetchPromise?: boolean) {
    const collection: any = get(schema, "collection")
    if (this.currentlyEditing !== id) {
      this.currentlyEditing = id
      mapTo = getMapTo(schema, mapTo)
      const fetchPromise = this.getFromServer(id, collection).then((res) => {
        const doc = res == null ? this.getState[collection][id] : res
        FormStore.setValue(mapTo, doc, prefix)
        return doc
      })
      if (returnFetchPromise) {
        return fetchPromise
      }
    }
    const result = this.getState[collection] ? this.getState[collection][id] : undefined
    return returnFetchPromise ? Promise.resolve(result) : result
  }

  public getCreateState(mapTo: string, prefix?: string) {
    return this.createState[prependPrefix(mapTo, prefix)]
  }

  public getUpdateState(mapTo: string, prefix?: string) {
    return this.updateState[prependPrefix(mapTo, prefix)]
  }

  public getRemoveState(id: string) {
    return this.removeState[id]
  }

  public get(id: string, collection: string, returnFetchPromise?: boolean) {
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
    if (this.getState[collection] == null) {
      this.getState[collection] = {}
    }
    try {
      this.fetching[id] = true
      FormStore.setLoading(id, true)
      const result = await BackendClient.client.get(collection, id)
      this.lastFetch[id] = Date.now()
      this.getState[collection][id] = result
      FormStore.setLoading(id, false)
      this.fetching[id] = false
      return result
    } catch (error) {
      FormStore.setLoading(id, false)
      FormStore.setError(id, error)
      this.fetching[id] = false
      return error
    }
  }

  public async remove(id: string, collection: string) {
    this.getState = {...this.getState}
    if (this.getState[collection] == null) {
      this.getState[collection] = {}
    }
    try {
      FormStore.setLoading(id, true, REMOVE_ADDON_KEY)
      const result = await BackendClient.client.remove(collection, id)
      this.removeState[id] = result
      delete this.getState[collection][id]
      FormStore.setLoading(id, false, REMOVE_ADDON_KEY)
      return result
    } catch (error) {
      FormStore.setError(id, error, REMOVE_ADDON_KEY)
      FormStore.setLoading(id, false, REMOVE_ADDON_KEY)
      return error
    }
  }

}

export default new DbStore()
export {
  REMOVE_ADDON_KEY
}
