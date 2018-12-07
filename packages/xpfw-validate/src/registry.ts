import { isArray, isString } from "lodash"
import { IField, IForm, IRegistry, ValidateFunction } from "./typeDef"

class ValidationRegistry implements IRegistry {
  public forms: {[model: string]: IForm}
  public fields: {[mapTo: string]: IField}
  public validators: {[mapTo: string]: ValidateFunction}
  public constructor() {
    this.forms = {}
    this.fields = {}
    this.validators = {}
  }
  public registerField(field: IField) {
    this.fields[field.mapTo] = field
  }
  public findField(mapTo: string) {
    return this.fields[mapTo]
  }
  public registerForm(form: IForm) {
    this.forms[form.model] = form
    if (isString(form.collection)) {
      this.forms[form.collection] = form
    }
    if (isArray(form.multiCollection)) {
      this.forms[form.multiCollection.join(".")] = form
    }
    if (isArray(form.sections)) {
      for (const section of form.sections) {
        for (const field of section.fields) {
          this.registerField(field)
        }
      }
    }
  }
  public findForm(model: string) {
    return this.forms[model]
  }
  public registerValidator(name: string, validator: ValidateFunction) {
    this.validators[name] = validator
  }
  public findValidator(name: string) {
    return this.validators[name]
  }
}

const GlobalRegObj: IRegistry = new ValidationRegistry()

export { ValidationRegistry }
export default GlobalRegObj
