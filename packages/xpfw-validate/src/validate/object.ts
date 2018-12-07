
import { each, get, isArray, isNil, isObject } from "lodash"
import { ErrorType } from "../globals"
import { IErrorBase, IField, ValidateFunction } from "../typeDef"
import validateAny from "./any"
import checkShouldBeRequired from "./util/checkShouldBeRequired"

const validateObject: ValidateFunction = (value, field, params) => {
  const errors: IErrorBase[] = []
  if (checkShouldBeRequired(field, params) && !isObject(value)) {
    errors.push({
      type: ErrorType.invalidType
    })
  }
  if (errors.length > 0) {
    return Promise.reject({mapTo: field.mapTo, errors})
  }
  const promises: Array<Promise<any>> = []
  const objectDef = get(field, `validate.objectDef`)
  if (isArray(objectDef)) {
    each(objectDef, (subFieldOptions: IField) => {
      const date = get(value, subFieldOptions.mapTo)
      promises.push(validateAny(date, subFieldOptions, params))
    })
  }
  return Promise.all(promises).then((results) => {
    return value
  })
}

export default validateObject
