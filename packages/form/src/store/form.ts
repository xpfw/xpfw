import { get, set } from "lodash-es"
import { observable } from "mobx"
import prefixMaker from "../util/prefixMaker"
import { action } from "mobx"

/**
 * Holds data relevant form Forms such as values and validation errors
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
   * Acquire a value from the form data
   * @param valuePath key where the value of the field will be saved. uses lodash.get/set string syntax style so subfields, array indices etc. can be used within the string
   * @param prefix prepended to mapTo to allow same mapTo keys to have different values
   */
  public getValue(valuePath: string, prefix?: string): any {
    return get(this.formData, `${prefixMaker(prefix)}${valuePath}`)
  }

  /**
   * Set a value in the form data
   * @param valuePath key where the value of the field will be saved. uses lodash.get/set string syntax style so subfields, array indices etc. can be used within the string
   * @param value the new value
   * @param prefix prepended to mapTo to allow same mapTo keys to have different values
   */
  @action
  public setValue(valuePath: string, value: any, prefix?: string) {
    set(this.formData, `${prefixMaker(prefix)}${valuePath}`, value)
  }

  /**
   * Acquire a value from the form errors
   * @param valuePath key where the value of the field will be saved. uses lodash.get/set string syntax style so subfields, array indices etc. can be used within the string
   * @param prefix prepended to mapTo to allow same mapTo keys to have different values
   */
  public getError(valuePath: string, prefix?: string): any {
    return get(this.errors, `${prefixMaker(prefix)}${valuePath}`)
  }

  /**
   * Set a value in the form errors
   * @param valuePath key where the value of the field will be saved. uses lodash.get/set string syntax style so subfields, array indices etc. can be used within the string
   * @param value the new value
   * @param prefix prepended to mapTo to allow same mapTo keys to have different values
   */
  @action
  public setError(valuePath: string, value: any, prefix?: string) {
    set(this.errors, valuePath, value)
  }
}

const FormStore = new FormStoreClass()
export default FormStore