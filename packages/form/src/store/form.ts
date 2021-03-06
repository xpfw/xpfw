import { get, set } from "lodash"
import { action, observable, makeObservable } from "mobx"
import { prependPrefix } from "../util/prefixMaker"

/**
 * Holds data relevant for Forms such as values and validation errors
 */
export class FormStoreClass {
  /**
   * MobX Observable containing all form data
   */
  @observable
  public formData: any = {}
  /**
   * MobX Observable containing all form errors
   */
  @observable
  public errors: any = {}
  /**
   * MobX Observable containing Loading states
   */
  @observable
  public loading: any = {}

  /**
   * Acquire a value from the form data
   * @param valuePath key where the value of the field will be saved. uses lodash.get/set string syntax style so subfields, array indices etc. can be used within the string
   * @param prefix prepended to mapTo to allow same mapTo keys to have different values
   * @param defaultValue value to return if it is not set in the form data
   */
  public getValue(mapTo?: string, prefix?: string, defaultValue?: any): any {
    if (mapTo != null) {
      // todo: support for multiple nested arrays
      const mi = mapTo.indexOf("[")
      if (mi !== -1) {
        const me = mapTo.indexOf("]")
        const num = Number(mapTo.substring(mi + 1, me))
        const arr = mapTo.substring(0, mi)
        let pop = get(this.formData, prependPrefix(arr, prefix))
        if (pop == null) {
          pop = []
        }
        while (pop.length < num) {
          pop.push(undefined)
        }
        FormStore.setValue(arr, pop, prefix)
      }
    }
    return get(this.formData, prependPrefix(mapTo, prefix), defaultValue)
  }

  /**
   * Set a value in the form data
   * @param valuePath key where the value of the field will be saved. uses lodash.get/set string syntax style so subfields, array indices etc. can be used within the string
   * @param value the new value
   * @param prefix prepended to mapTo to allow same mapTo keys to have different values
   */
  @action
  public setValue(mapTo?: string, value?: any, prefix?: string) {
    set(this.formData, prependPrefix(mapTo, prefix), value)
  }

  /**
   * Acquire a value from the form errors
   * @param valuePath key where the value of the field will be saved. uses lodash.get/set string syntax style so subfields, array indices etc. can be used within the string
   * @param prefix prepended to mapTo to allow same mapTo keys to have different values
   */
  public getError(valuePath?: string, prefix?: string): any {
    return get(this.errors, prependPrefix(valuePath, prefix))
  }

  /**
   * Set a value in the form errors
   * @param valuePath key where the value of the field will be saved. uses lodash.get/set string syntax style so subfields, array indices etc. can be used within the string
   * @param value the new value
   * @param prefix prepended to mapTo to allow same mapTo keys to have different values
   */
  @action
  public setError(valuePath?: string, value?: any, prefix?: string) {
    set(this.errors, prependPrefix(valuePath, prefix), value)
  }

  /**
   * Acquire a value from the form errors
   * @param valuePath key where the value of the field will be saved. uses lodash.get/set string syntax style so subfields, array indices etc. can be used within the string
   * @param prefix prepended to mapTo to allow same mapTo keys to have different values
   */
  public getLoading(valuePath?: string, prefix?: string): any {
    return get(this.loading, prependPrefix(valuePath, prefix))
  }

  /**
   * Set a value in the form errors
   * @param valuePath key where the value of the field will be saved. uses lodash.get/set string syntax style so subfields, array indices etc. can be used within the string
   * @param value the new value
   * @param prefix prepended to mapTo to allow same mapTo keys to have different values
   */
  @action
  public setLoading(valuePath: string, value: boolean, prefix?: string) {
    set(this.loading, prependPrefix(valuePath, prefix), value)
  }

  public constructor() {
    makeObservable(this)
  }
}

const FormStore = new FormStoreClass()
export default FormStore
