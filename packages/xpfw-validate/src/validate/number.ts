import { isNaN, isNil, isNumber, isString } from "lodash"
import { ErrorType } from "../globals"
import { IErrorBase, ValidateFunction } from "../typeDef"
import checkShouldBeRequired from "./util/checkShouldBeRequired"

const validateNumber: ValidateFunction = (value, field, params) => {
  const errors: IErrorBase[] = []
  const validate: any = field.validate
  let isValidType = false
  let num = value
  if (!isNil(value)) {
    if (isString(num) && num.length > 0) {
      num = Number(num)
    }
    if (!isNumber(num) || isNaN(num)) {
      errors.push({
        type: ErrorType.invalidType
      })
    } else {
      isValidType = true
    }
  }
  if (checkShouldBeRequired(field, params) && !isValidType) {
    errors.push({
        type: ErrorType.required
    })
  }
  if (isValidType && isNumber(validate.min)) {
    if (value < validate.min) {
      errors.push({
        type: ErrorType.tooLow
      })
    }
  }
  if (isValidType && isNumber(validate.max)) {
    if (value > validate.max) {
      errors.push({
        type: ErrorType.tooHigh
      })
    }
  }
  if (errors.length > 0) {
    return Promise.reject({mapTo: field.mapTo, errors})
  }
  return Promise.resolve(num)
}

export default validateNumber
