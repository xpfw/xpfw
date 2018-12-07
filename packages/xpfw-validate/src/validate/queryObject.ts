import {
  get, indexOf, intersection, isArray, isNil,
  isNumber, isString, keys, set,
  union } from "lodash"
import { getFieldsFromForm } from ".."
import { FieldType } from "../globals"
import cleanUpDoc from "../permission/cleanUpDoc"
import getPermittedFields from "../permission/getPermittedFields"
import { IField, IForm, ValidateFunction } from "../typeDef"
import validateAny from "./any"
import validateForm from "./form"
import getRequireOwner from "./util/getRequireOwner"

const sameTypeOperators = ["$eq", "$gt", "$gte", "$lt", "$lte", "$ne"]
const arrayQueryOperators = ["$in", "$nin"]
const arrayWithSubFieldsOperators = ["$or", "$and"]
// TODO: all categories below logical query operators
const possibleQueryOperators = union(sameTypeOperators, arrayQueryOperators, arrayWithSubFieldsOperators)

const sortArrayField: IField = {
  type: FieldType.Array,
  mapTo: "$sort",
  validate: {type: FieldType.Number}
}
// TODO:_ rewrite so not field but form is given
const validateQueryObject: (value: any, form: IForm, params: any) => Promise<any> = async (value, form, params) => {
  const fields = getFieldsFromForm(form)
  const permittedFields = await getPermittedFields(form, params)
  const objKeys = keys(value)
  const newObj: any = {}
  for (const field in permittedFields) {
    const val = get(value, field)
    if (!isNil(val)) {
      set(newObj, field, val)
    }
  }
  if (indexOf(objKeys, "$sort") !== -1) {
    let res = await validateAny(get(value, "$sort"), sortArrayField, params)
    res = cleanUpDoc(permittedFields, res)
    if (!isNil(res)) {
      newObj.$sort = res
    }
  }
  if (isNumber(get(value, "$limit"))) {
    set(newObj, "$limit", get(value, "$limit"))
  }
  if (isNumber(get(value, "$skip"))) {
    set(newObj, "$skip", get(value, "$skip"))
  }
  for (const field of fields) {
    const fieldVal = get(value, field.mapTo)
    const sameTypeKeys = intersection(keys(fieldVal), sameTypeOperators)
    if (sameTypeKeys.length > 0) {
      const fieldObj: any = {}
      for (const key of sameTypeKeys) {
        try {
          const res = await validateAny(fieldVal[key], field, params)
          if (!isNil(res)) {
            fieldObj[key] = res
          }
        } catch (e) {
          return Promise.reject(e)
        }
      }
      set(newObj, field.mapTo, fieldObj)
    }
  }
  for (const field of fields) {
    const fieldVal = get(value, field.mapTo)
    const arrayQueryKeys = intersection(keys(fieldVal), arrayQueryOperators)
    if (arrayQueryKeys.length > 0) {
      const fieldObj: any = {}
      const arrayField = {type: FieldType.Array, mapTo: "any", validate: {type: field.type}}
      for (const key of arrayQueryKeys) {
        try {
          const res = await validateAny(fieldVal[key], arrayField, params)
          if (!isNil(res)) {
            fieldObj[key] = res
          }
        } catch (e) {
          return Promise.reject(e)
        }
      }
      set(newObj, field.mapTo, fieldObj)
    }
  }
  const arraySubFieldOp = intersection(objKeys, arrayWithSubFieldsOperators)
  if (arraySubFieldOp.length > 0) {
    const subForm: any = params.form
    for (const key of arraySubFieldOp) {
      try {
        const oldContent = value[key]
        if (isArray(oldContent)) {
          const newContent = []
          for (const content of oldContent) {
            const res = await validateForm(content, subForm, params)
            if (!isNil(res) && keys(res).length > 0) {
              if (!isArray(newObj[key])) {
                newObj[key] = []
              }
              newObj[key].push(res)
            }
          }
        }
      } catch (e) {
        return Promise.reject(e)
      }
    }
    if (keys(newObj).length === 0) {
      return Promise.reject("empty query")
    }
  } else {
    const requireOwner = getRequireOwner(form, params.method)
    if (isString(requireOwner)) {
      const idPath: any = params.idPath
      set(newObj, requireOwner, get(params.currentUser, idPath))
    }
  }
  if (keys(newObj).length > 0) {
    return Promise.resolve(newObj)
  }
  return Promise.resolve(null)
}

export { possibleQueryOperators, arrayWithSubFieldsOperators }
export default validateQueryObject
