import { isDate, isNil, isString } from "lodash"
import * as moment from "moment"
import { ErrorType } from "../globals"
import { IErrorBase, ValidateFunction } from "../typeDef"
import checkShouldBeRequired from "./util/checkShouldBeRequired"
const m: any = moment
const validateDate: ValidateFunction = (value, field, params) => {
  if (isString(value) && m(value).isValid()) {
    value = m(value).toDate()
  }
  const errors: IErrorBase[] = []
  const isValidDate = isDate(value)
  if (checkShouldBeRequired(field, params) && !isValidDate) {
    errors.push({
      type: ErrorType.required
    })
  }
  if (!isNil(value) && !isValidDate) {
    errors.push({
      type: ErrorType.invalidType
    })
  }
  if (errors.length > 0) {
    return Promise.reject({mapTo: field.mapTo, errors})
  }
  return Promise.resolve(value)
}

export default validateDate
