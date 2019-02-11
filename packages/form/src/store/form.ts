import { get, set } from "lodash-es"
import { observable } from "mobx"
import prefixMaker from "../util/prefixMaker"
import { action } from "mobx"

export class FormStoreClass {
  @observable
  public formData: any = {}
  @observable
  public errors: any = {}

  public getValue(valuePath: string, prefix?: string): any {
    return get(this.formData, `${prefixMaker(prefix)}${valuePath}`)
  }

  @action
  public setValue(valuePath: string, value: any, prefix?: string) {
    set(this.formData, `${prefixMaker(prefix)}${valuePath}`, value)
  }

  public getError(valuePath: string, prefix?: string): any {
    return get(this.errors, `${prefixMaker(prefix)}${valuePath}`)
  }

  @action
  public setError(valuePath: string, value: any, prefix?: string) {
    set(this.errors, valuePath, value)
  }
}

const FormStore = new FormStoreClass()
export default FormStore
