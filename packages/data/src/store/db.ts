import { ExtendedJSONSchema, FormStore, getMapTo, prependPrefix } from "@xpfw/form"
import { get, isEqual, isNil, set } from "lodash"
import { action, flow, observable } from "mobx"
import BackendClient from "../client"
import dataOptions from "../options"
import ListStore from "../store/list"
import toJS from "../util/toJS"
import UserStore from "./user"

const FETCH_THRESHOLD = 1000 * 60 * 3

const REMOVE_ADDON_KEY = "remove"

export class DbStoreClass {

  public getFromServer = flow(function *(this: DbStoreClass, id: string, collection: string) {
    if (this.getState[collection] && this.getState[collection][id]) {
      if (this.lastFetch[id] && Date.now() - this.lastFetch[id] < FETCH_THRESHOLD) {
        return this.getState[collection][id]
      }
    }
    if (this.fetching[id] === true || Date.now() - this.lastFetch[id] < FETCH_THRESHOLD) {
      return
    }
    this.getState = {...this.getState}
    if (this.getState[collection] == null) {
      this.getState[collection] = {}
    }
    try {
      this.fetching[id] = true
      FormStore.setLoading(id, true)
      this.lastFetch[id] = Date.now()
      const result = yield BackendClient.client.get(collection, id)
      this.getState[collection][id] = result
      FormStore.setError(id, undefined)
      FormStore.setLoading(id, false)
      this.fetching[id] = false
      return result
    } catch (error) {
      FormStore.setLoading(id, false)
      FormStore.setError(id, error)
      this.fetching[id] = false
      return error
    }
  })
  @observable
  public currentlyEditing: string = ""

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

  public getEditOriginal(id: string, schema: ExtendedJSONSchema,
                         mapTo?: string, prefix: string = "", returnFetchPromise?: boolean) {
    const collection: any = get(schema, "collection")
    if (this.getState[collection] == null) {
      this.getState[collection] = {}
    }
    const result = this.getState[collection] ? this.getState[collection][id] : undefined
    if (this.currentlyEditing !== id) {
      return action(() => {
        const saveResultAt = `${prependPrefix(mapTo, prefix)}${id}`
        this.updateState[saveResultAt] = null
        this.currentlyEditing = id
        mapTo = getMapTo(schema, mapTo)
        if (result == null) {
          const fetchPromise = this.getFromServer(id, collection).then(action((res) => {
            const doc = this.getState[collection][id]
            this.updateState[saveResultAt] = null
            FormStore.setValue(mapTo, doc, prefix)
            return doc
          }))
          if (returnFetchPromise) {
            return fetchPromise
          }
        } else {
          FormStore.setValue(mapTo, toJS(result), prefix)
        }
        return undefined
      })()
    }
    const currentVal = FormStore.getValue(mapTo, prefix)
    if (result != null && (currentVal == null || currentVal[dataOptions.idPath] !== result[dataOptions.idPath])) {
      FormStore.setValue(mapTo, result, prefix)
    }
    return returnFetchPromise ? Promise.resolve(result) : result
  }

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
      ListStore.setCollectionDirty(col)
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
      const col = String(schema.collection)
      const result = await BackendClient.client.patch(col, id, toJS(FormStore.getValue(mapTo, prefix)))
      this.updateState[saveResultAt] = result
      ListStore.setCollectionDirty(col)
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

  @action
  public getGetState(id: string, collection: string, tryFetch: boolean) {
    if (tryFetch) {
      setTimeout(() => this.getFromServer(id, collection), 1)
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
      ListStore.setCollectionDirty(collection)
      FormStore.setLoading(id, false, REMOVE_ADDON_KEY)
      return result
    } catch (error) {
      FormStore.setError(id, error, REMOVE_ADDON_KEY)
      FormStore.setLoading(id, false, REMOVE_ADDON_KEY)
      return error
    }
  }

}
const DbStore = new DbStoreClass()
export default DbStore
export {
  REMOVE_ADDON_KEY
}
