import { each, get, isArray, isBoolean, isNil, isNumber, isObject, isString } from "lodash"
import { Method, RequiredType } from "../../globals"
import { IField, IParametersBase } from "../../typeDef"

const checkShouldBeRequired = (field: IField, checkOptions: IParametersBase) => {
  let shouldBeRequired = false
  const gotFormData =  isObject(checkOptions) && isObject(checkOptions.formData)
  const method = isObject(checkOptions) && isString(checkOptions.method) ? checkOptions.method : Method.Create
  if (method === Method.Create && isObject(field)) {
    const validate = field.validate
    if (validate !== null && validate !== undefined) {
      if (!isNil(validate.required) && isObject(validate.required) && isNumber(validate.required.type)) {
        switch (validate.required.type) {
          case RequiredType.Always: {
            shouldBeRequired = true
          }
          case RequiredType.AllNotSet: {
            shouldBeRequired = true
            if (isArray(validate.required.model) && gotFormData) {
              each(validate.required.model, (model) => {
                if (isString(model) && !isNil(get(checkOptions.formData, model))) {
                  shouldBeRequired = false
                }
              })
            }
            break
          }
          case RequiredType.SetToVal: {
            shouldBeRequired = false
            const model = validate.required.model
            if (isString(model) && isArray(validate.required.values) && gotFormData) {
              each(validate.required.values, (possibleValue) => {
                if (get(checkOptions.formData, model) === possibleValue) {
                  shouldBeRequired = true
                }
              })
            }
            break
          }
        }
      }
    }
  }
  return shouldBeRequired
}

export default checkShouldBeRequired
