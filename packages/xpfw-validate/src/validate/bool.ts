import { isBoolean, isNil } from "lodash"
import { ErrorType } from "../globals"
import { IErrorBase, ValidateFunction } from "../typeDef"
import checkShouldBeRequired from "./util/checkShouldBeRequired"

const validateBool: ValidateFunction = (value, field, params) => {
  const errors: IErrorBase[] = []
  const isValidBoolean = isBoolean(value)
  if (checkShouldBeRequired(field, params) && (!isValidBoolean || !value)) {
    errors.push({
      type: ErrorType.required
    })
  }
  if (!isNil(value) && !isValidBoolean) {
    errors.push({
      type: ErrorType.invalidType
    })
  }
  if (errors.length > 0) {
    return Promise.reject({mapTo: field.mapTo, errors})
  }
  return Promise.resolve(value)
}

export default validateBool
