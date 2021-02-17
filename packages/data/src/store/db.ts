import { ExtendedJSONSchema, FormStore, getMapTo, prependPrefix, useModifier } from "@xpfw/form"
import { get } from "lodash"
import { action, flow, observable, makeObservable } from "mobx"
import BackendClient from "../client"
import dataOptions from "../options"
import ListStore from "../store/list"
import jsonPatchToMongoDb from "../util/jsonPatchToMongoDb"
import toJS from "../util/toJS"

const FETCH_THRESHOLD = 1000 * 60 * 3
const REMOVE_ADDON_KEY = "remove"
declare const require: any
export interface FormToUpdate {
  collection: string
  mapTo: string
  prefix?: string
}

export class DbStoreClass {
  @observable
  public currentlyEditing: any = {}

  /** Push here for forms to get updated after a real-time update */
  public formsToUpdate: FormToUpdate[] = []

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
  private fetching: {[index: string]: any} = {}

  public async getFromServer(id: string, collection: string) {
    const error = FormStore.getError(id)
    if (error != null && error.code === 404) {
      return undefined
    }
    if (this.getState[collection] && this.getState[collection][id]) {
      if (this.lastFetch[id] && Date.now() - this.lastFetch[id] < FETCH_THRESHOLD) {
        return Promise.resolve(this.getState[collection][id])
      }
    }
    if (this.fetching[id] == null) {
      const thisRef = this
      this.fetching[id] = flow(function *(this: DbStoreClass) {
        if (thisRef.getState[collection] == null) {
          thisRef.getState[collection] = {}
        }
        try {
          FormStore.setLoading(id, true)
          thisRef.lastFetch[id] = Date.now()
          const result = yield BackendClient.client.get(collection, id)
          thisRef.getState[collection][id] = result
          FormStore.setError(id, undefined)
          FormStore.setLoading(id, false)
          delete thisRef.fetching[id]
          return result
        } catch (error) {
          FormStore.setLoading(id, false)
          if (error != null) {
            delete error.hook
          }
          FormStore.setError(id, error)
          delete thisRef.fetching[id]
          return error
        }
      })()
    }
    return this.fetching[id]
  }

  public getEditOriginal(id: string, schema: ExtendedJSONSchema,
                         mapTo?: string, prefix: string = "", returnFetchPromise?: boolean) {
    const collection: any = get(schema, "collection")
    if (this.getState[collection] == null) {
      this.getState[collection] = {}
    }
    const result = this.getState[collection] ? this.getState[collection][id] : undefined
    if (this.currentlyEditing[prefix] !== id) {
      return action(() => {
        const saveResultAt = `${prependPrefix(mapTo, prefix)}${id}`
        this.updateState[saveResultAt] = null
        this.currentlyEditing[prefix] = id
        mapTo = getMapTo(schema, mapTo)
        if (result == null) {
          const fetchPromise = this.getFromServer(id, collection).then(action((res: any) => {
            const doc = this.getState[collection][id]
            this.updateState[saveResultAt] = null
            FormStore.setValue(mapTo, toJS(doc), prefix)
            return doc
          }))
          if (returnFetchPromise) {
            return fetchPromise
          }
        } else {
          FormStore.setValue(mapTo, toJS(result), prefix)
        }
        return result
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
      FormStore.setLoading(saveResultAt, true)
      const data = await useModifier(toJS(FormStore.getValue(mapTo, prefix)), schema, "create")
      // add withfunction modification
      const col: any = schema.collection
      const result = await BackendClient.client.create(col, data)
      this.createState[saveResultAt] = result
      ListStore.setCollectionDirty(col, true)
      this.setItem(get(result, dataOptions.idPath), col, result)
      FormStore.setLoading(saveResultAt, false)
      return result
    } catch (error) {
      FormStore.setLoading(saveResultAt, false)
      if (error != null) {
        delete error.hook
      }
      FormStore.setError(saveResultAt, error)
      return error
    }
  }

  public async patch(id: string, schema: ExtendedJSONSchema, mapTo?: string, prefix: string = "") {
    mapTo = getMapTo(schema, mapTo)
    const saveResultAt = `${prependPrefix(mapTo, prefix)}${id}`
    try {
      FormStore.setLoading(saveResultAt, true)
      const col = String(schema.collection)
      let valueToSubmit = await useModifier(toJS(FormStore.getValue(mapTo, prefix)), schema, "update")
      if (dataOptions.onlyPatchDiffs) {
        const compare = require("fast-json-patch").compare
        const orig = DbStore.getGetState(id, col, false)
        if (valueToSubmit != null && orig != null) {
          delete valueToSubmit[dataOptions.idPath]
          delete orig[dataOptions.idPath]
          const diff = compare(orig, valueToSubmit)
          valueToSubmit = jsonPatchToMongoDb(diff)
        }
      }
      const result = await BackendClient.client.patch(col, id, valueToSubmit)
      this.updateState[saveResultAt] = result
      ListStore.setCollectionDirty(col, true)
      FormStore.setLoading(saveResultAt, false)
      this.setItem(id, col, result)
      return result
    } catch (error) {
      FormStore.setLoading(saveResultAt, false)
      if (error != null) {
        delete error.hook
      }
      FormStore.setError(saveResultAt, error)
      return error
    }
  }

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
    const previous = this.getState[collection][id]
    this.getState[collection][id] = object
    this.lastFetch[id] = Date.now()
    this.setFormOfItem(collection, object, previous)
  }

  @action
  public setFormOfItem(collection: string, object: any, original: any) {
    for (const formToUpdate of this.formsToUpdate) {
      if (formToUpdate.collection === collection) {
        if (dataOptions.onlyPatchDiffs) {
          const compare = require("fast-json-patch").compare
          const patches = compare(original, object)
          const apply = require("fast-json-patch").applyPatch
          const currentValue = FormStore.getValue(formToUpdate.mapTo, formToUpdate.prefix, {})
          apply(currentValue, patches)
        } else {
          FormStore.setValue(formToUpdate.mapTo, object, formToUpdate.prefix)
        }
      }
    }
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
    try {
      FormStore.setLoading(id, true, REMOVE_ADDON_KEY)
      const result = await BackendClient.client.remove(collection, id)
      this.removeState[id] = result
      if (this.getState[collection] == null) {
        this.getState[collection] = {}
      }
      delete this.getState[collection][id]
      ListStore.setCollectionDirty(collection, true)
      FormStore.setLoading(id, false, REMOVE_ADDON_KEY)
      return result
    } catch (error) {
      FormStore.setLoading(id, false, REMOVE_ADDON_KEY)
      if (error != null) {
        delete error.hook
      }
      FormStore.setError(id, error, REMOVE_ADDON_KEY)
      return error
    }
  }

  public constructor() {
    makeObservable(this)
  }
}
const DbStore = new DbStoreClass()
export default DbStore
export {
  REMOVE_ADDON_KEY
}
