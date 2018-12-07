import { get, isArray, isBoolean, isNil, isNumber, isObject, isString } from "lodash"
import { ErrorType } from "../globals"
import { IError, ValidateFunction } from "../typeDef"
import checkShouldBeRequired from "./util/checkShouldBeRequired"

const validateText: ValidateFunction = (value, field, params) => {
  const errors: IError[] = []
  const validate: any = field.validate
  if (!isNil(value) && !isString(value)) {
    errors.push({
      type: ErrorType.invalidType
    })
  }
  if (checkShouldBeRequired(field, params) && (isNil(value) || value.length === 0)) {
    errors.push({
      type: ErrorType.required
    })
  }
  if (isObject(validate) && isArray(validate.match)) {
    for (const toMatch of validate.match) {
      const compareVal = get(params, `formData.${toMatch}`)
      if (compareVal !== value) {
        errors.push({
          type: ErrorType.notEqual, custom: {toMatch}
        })
      }
    }
  }
  if (isObject(validate) && isNumber(validate.min)) {
    if (!isString(value) || value.length < validate.min) {
      errors.push({
        type: ErrorType.tooLow
      })
    }
  }
  if (!isNil(validate) && isNumber(validate.max)) {
    if (!isString(value) || value.length > validate.max) {
      errors.push({
        type: ErrorType.tooHigh
      })
    }
  }
  if (errors.length > 0) {
    return Promise.reject({mapTo: field.mapTo, errors})
  }
  return Promise.resolve(value)
}

export default validateText
