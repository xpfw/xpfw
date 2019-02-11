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
    set(this.formData, valuePath, value)
  }

  public getError(valuePath: string, prefix?: string): any {
    return get(this.errors, `${prefixMaker(prefix)}${valuePath}`)
  }

  @action
  public setError(valuePath: string, value: any, prefix?: string) {
    set(this.errors, valuePath, value)
  }

  // public getFormData(form: IForm, prefix: string = "", method: string = "create") {
  //   const fullData: any = {}
  //   const formData = this.formData
  //   iterateFields(form, (field) => {
  //     let defaultValue = get(field, "validate.defaultValue")
  //     if (method === globals.Method.Find) {
  //       defaultValue = undefined
  //     }
  //     let value = get(formData,
  //       `${prefix && prefix.length > 0 ? prefix + "." : ""}${field.mapTo}`, defaultValue)
  //     let converter: any = get(field, "validate.convert")
  //     if (!isFunction(converter) && isObject(converter)) {
  //       converter = converter[method]
  //     }
  //     if (isFunction(converter)) {
  //       value = converter(value)
  //     }
  //     if (method !== globals.Method.Find || method === globals.Method.Find && !isNil(value))  {
  //       set(fullData, field.mapTo, value)
  //     }
  //   })
  //   return fullData
  // }

  // public copyDocToFormData(doc: any, form: IForm, prefix: string = "") {
  //   iterateFields(form, (field) => {
  //       this.setValue(`${prefix && prefix.length > 0 ? prefix + "." : ""}${field.mapTo}`, get(doc, field.mapTo))
  //   })
  //   this.trigger()
  // }

  // public async validateField(field: IField, form: IForm, method: string = "create",
  //                            prefix: string = "", currentUser?: string) {
  //   const valuePath = `${prefix && prefix.length > 0 ? prefix + "." : ""}${field.mapTo}`
  //   try {
  //     await validateField(get(this.formData, valuePath), field, {
  //       method,
  //       field,
  //       form,
  //       currentUser,
  //       registry: ValidationRegistry
  //     })
  //     FormErrorStore.setError(valuePath, {ok: true})
  //   } catch (e) {
  //     FormErrorStore.setError(valuePath, e)
  //   }
  // }

  // public async validateForm(form: IForm, method: string = "create", prefix: string = "", currentUser?: string) {
  //   const valuePath = `${prefix && prefix.length > 0 ? prefix + "." : ""}${form.model}`
  //   try {
  //     await validateForm(this.getFormData(form, prefix), form, {
  //       method,
  //       form,
  //       currentUser,
  //       registry: ValidationRegistry
  //     })
  //     FormErrorStore.setError(valuePath, {ok: true})
  //   } catch (e) {
  //     FormErrorStore.setError(valuePath, e)
  //   }
  // }

  // public resetForm(form: IForm, prefix: string = "")  {
  //   iterateFields(form, (field) => {
  //     this.setValue(`${prefix && prefix.length > 0 ? prefix + "." : ""}${field.mapTo}`, undefined)
  //   })
  // }
}

const FormStore = new FormStoreClass()
export default FormStore
