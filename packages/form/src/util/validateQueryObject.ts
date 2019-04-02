import {
  get, intersection,
  isNumber, keys, set,
  union } from "lodash"
import { ExtendedJSONSchema } from "../jsonschema"
import jsonValidator from "../jsonValidator"

const sameTypeOperators = ["$eq", "$gt", "$gte", "$lt", "$lte", "$ne"]
const arrayQueryOperators = ["$in", "$nin"]
const arrayWithSubFieldsOperators = ["$or", "$and"]
// TODO: all categories below logical query operators
const possibleQueryOperators = union(sameTypeOperators, arrayQueryOperators, arrayWithSubFieldsOperators)

// TODO:_ rewrite so not field but form is given
const validateQueryObject: (value: any, schema: ExtendedJSONSchema) => any = async (value, schema) => {
  const newObj: any = {}
  let hadFindKeys = false
  if (schema.properties != null) {
    for (const subSchemaKey of Object.keys(schema.properties)) {
      const subSchema: any = schema.properties[subSchemaKey]
      const fieldVal = get(value, String(subSchema.title))
      const sameTypeKeys = intersection(keys(fieldVal), sameTypeOperators)
      if (sameTypeKeys.length > 0) {
        hadFindKeys = true
        const fieldObj: any = {}
        for (const key of sameTypeKeys) {
          jsonValidator.validate(subSchema, fieldVal[key])
          if (jsonValidator.errors != null && jsonValidator.errors.length > 0) {
            throw new Error(JSON.stringify(jsonValidator.errors))
          }
          fieldObj[key] = fieldVal[key]
        }
        set(newObj, String(subSchema.title), fieldObj)
      }
      const arrayQueryKeys = intersection(keys(fieldVal), arrayQueryOperators)
      if (arrayQueryKeys.length > 0) {
        hadFindKeys = true
        const fieldObj: any = {}
        const arrayField = {type: "array", items: {type: subSchema.type}}
        for (const key of arrayQueryKeys) {
          jsonValidator.validate(arrayField, fieldVal[key])
          if (jsonValidator.errors != null && jsonValidator.errors.length > 0) {
            throw new Error(JSON.stringify(jsonValidator.errors))
          }
          fieldObj[key] = fieldVal[key]
        }
        set(newObj, String(subSchema.title), fieldObj)
      }
    }
  }

  const arraySubFieldOp = intersection(Object.keys(value), arrayWithSubFieldsOperators)
  if (arraySubFieldOp.length > 0) {
    hadFindKeys = true
    for (const key of arraySubFieldOp) {
      const arr = value[key]
      if (Array.isArray(arr)) {
        const newArr = []
        for (const v of arr) {
          newArr.push(await validateQueryObject(v, schema))
        }
        newObj[key] = newArr
      } else {
        throw new Error(`${key} should be an array but isn't`)
      }
    }
  }
  if (hadFindKeys === false) {
    jsonValidator.validate(schema, value)
    if (jsonValidator.errors != null) {
      const errors = jsonValidator.errors.filter((err) => err.keyword !== "required")
      if (errors.length > 0) {
        throw new Error(JSON.stringify(jsonValidator.errors))
      }
    }
    return value
  }
  if (isNumber(get(value, "$limit"))) {
    set(newObj, "$limit", get(value, "$limit"))
  }
  if (isNumber(get(value, "$skip"))) {
    set(newObj, "$skip", get(value, "$skip"))
  }
  return newObj
}

export { possibleQueryOperators, arrayWithSubFieldsOperators }
export default validateQueryObject
