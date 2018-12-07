import { isNaN, isNil, isNumber, isString } from "lodash"
import { ErrorType } from "../globals"
import { IErrorBase, ValidateFunction } from "../typeDef"
import checkShouldBeRequired from "./util/checkShouldBeRequired"

const validateLocation: ValidateFunction = (value, field, params) => {
  const errors: IErrorBase[] = []
  const validate: any = field.validate
  const isValidType = Array.isArray(value)
  if (checkShouldBeRequired(field, params) && !isValidType) {
    errors.push({
        type: ErrorType.required
    })
  }
  if (isValidType) {
    if (value.length !== 2 || !isNumber(value[0]) || !isNumber(value[1])) {
      errors.push({
        type: ErrorType.invalidType
      })
    }
  }
  if (errors.length > 0) {
    return Promise.reject({mapTo: field.mapTo, errors})
  }
  return Promise.resolve(value)
}

export default validateLocation
