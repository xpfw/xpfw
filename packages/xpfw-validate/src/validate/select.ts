
import { each, get, isArray, isFunction, isNil, isNumber, isObject, isString } from "lodash"
import { ErrorType } from "../globals"
import { IErrorBase, IField, ValidateFunction } from "../typeDef"
import validateAny from "./any"
import checkShouldBeRequired from "./util/checkShouldBeRequired"

const validateSelect: ValidateFunction = (value, field, params) => {
  const errors: IErrorBase[] = []
  if (checkShouldBeRequired(field, params)) {
    let filled = !isNil(value)
    if (isString(value) && value.length === 0) {
      filled = false
    }
    if (isNumber(value) && value < 0) {
      filled = false
    }
    if (!filled) {
      errors.push({
        type: ErrorType.invalidType
      })
    }
  }
  let selOpts: any = get(field, "selectOptions")
  if (isFunction(selOpts)) {
    selOpts = selOpts(value, field, params)
  }
  if (isArray(selOpts) && !isNil(value)) {
    let isValidValue = false
    each(selOpts, (val: any) => {
      if (val.value === value) {
        isValidValue = true
      }
    })
    if (!isValidValue) {
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

export default validateSelect
