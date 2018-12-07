import { cloneDeep, each, get, isArray, isNil, isNumber, isString } from "lodash"
import { ErrorType, FieldType } from "../globals"
import { IErrorBase, ValidateFunction } from "../typeDef"
import validateAny from "./any"
import checkShouldBeRequired from "./util/checkShouldBeRequired"

const validateArray: ValidateFunction = (value, field, params) => {
  const errors: IErrorBase[] = []
  const validArray = isArray(value)
  if (checkShouldBeRequired(field, params) && !validArray) {
    errors.push({
      type: ErrorType.required
    })
  }
  if (validArray) {
    const min = get(field, "validate.min")
    if (isNumber(min)) {
      if (value.length < min) {
        errors.push({
          type: ErrorType.tooLow
        })
      }
    }
    const max = get(field, "validate.max")
    if (isNumber(max)) {
      if (value.length > max) {
        errors.push({
          type: ErrorType.tooHigh
        })
      }
    }
  }
  if (errors.length > 0) {
    return Promise.reject(errors)
  }
  const promises: Array<Promise<any>> = []
  if (!isNil(field.validate)) {
    const subValidate: any = field.validate
    if (isString(subValidate.type) || isNumber(subValidate.type)) {
      each(value, (date) => {
        const tmpFieldOptions = cloneDeep(field)
        tmpFieldOptions.type = subValidate.type
        if (tmpFieldOptions.type === FieldType.Array || tmpFieldOptions.type === FieldType.Object) {
          tmpFieldOptions.validate = subValidate.validate
        }
        promises.push(validateAny(date, tmpFieldOptions, params))
      })
    }
  }
  return Promise.all(promises).then((results) => {
    return value
  })
}

export default validateArray
