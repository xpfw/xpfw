import { get, intersection, isFunction, isNil, isNumber, isObject, isString, keys, set } from "lodash"
import { ErrorType, FieldType, Method } from "../globals"
import { IErrorBase, ValidateFunction } from "../typeDef"
import validateArray from "./array"
import validateBool from "./bool"
import validateDate from "./date"
import validateLocation from "./location"
import validateNumber from "./number"
import validateObject from "./object"
import validateQueryObject, { possibleQueryOperators } from "./queryObject"
import validateSelect from "./select"
import validateText from "./text"
import checkShouldBeRequired from "./util/checkShouldBeRequired"

const validateAny: ValidateFunction = (value, field, params) => {
  let errorResolve: any = null
  if (get(params, "method") === Method.Find && isObject(value)) {
    if (intersection(keys(value), possibleQueryOperators).length > 0) {
      const form: any = params.form
      return validateQueryObject(value, form, params)
    }
  }
  if (isObject(field) && !isNil(field.validate)) {
    if (isNumber(field.type)) {
      switch (field.type) {
        case FieldType.Text:
        case FieldType.Password:
        case FieldType.RelationshipSingle: {
          errorResolve = validateText(value, field, params)
          break
        }
        case FieldType.Number:
        case FieldType.Slider: {
          errorResolve = validateNumber(value, field, params)
          break
        }
        case FieldType.Boolean: {
          errorResolve = validateBool(value, field, params)
          break
        }
        case FieldType.Date: {
          errorResolve = validateDate(value, field, params)
          break
        }
        case FieldType.Select: {
          errorResolve = validateSelect(value, field, params)
          break
        }
        case FieldType.Object: {
          errorResolve = validateObject(value, field, params)
          break
        }
        case FieldType.Array:
        case FieldType.RelationshipMulti: {
          if (field.type === FieldType.RelationshipMulti) {
            set(field, "validate.type", FieldType.Text)
          }
          errorResolve = validateArray(value, field, params)
          break
        }
        case FieldType.Location: {
          errorResolve = validateLocation(value, field, params)
          break
        }
        default: {
          errorResolve = null
          break
        }
      }
    } else if (isString(field.type)) {
      if (isObject(params) && isObject(params.registry)) {
        const validator = params.registry.findValidator(field.type)
        if (isFunction(validator)) {
          errorResolve = validator(value, field, params)
        }
      }
    }
    if (isNil(errorResolve)) {
      console.log("erroirrseolve is null for", field)
      errorResolve = Promise.reject(false)
    }
  } else {
    errorResolve = Promise.resolve(value)
  }
  if (isObject(field) && isObject(field.validate)) {
    const validate: any = field.validate
    if (isFunction(validate.custom)) {
      let catched = false
      const errs: any = {mapTo: field.mapTo, errors: []}
      return errorResolve.catch((e: any) => {
        catched = true
        errs.errors = e
        return validate.custom(value, field, params)
      }).then(() => {
        if (!catched) {
          return validate.custom(value, field, params)
        }
        return Promise.reject(errs)
      })
    }
  }
  return errorResolve
}

export default validateAny
