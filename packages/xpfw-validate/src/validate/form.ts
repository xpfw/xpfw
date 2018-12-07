import { get, indexOf, intersection, isNil, isObject, isString, keys, set } from "lodash"
import { ErrorType, Method } from "../globals"
import getPermittedFields from "../permission/getPermittedFields"
import { IForm, IFormError, IParametersBase } from "../typeDef"
import validateField from "./any"
import validateQueryObject from "./queryObject"
import checkForFieldInSubKeys from "./util/checkForFieldInSubKeys"
import getRequireOwner from "./util/getRequireOwner"

const updateArrayOperators: string[] = [
  "$", "$inc", "addToSet", "$pop", "$pullAll", "$pull", "$pushAll", "$push",
  "$each", "$slice", "$sort", "$position", "$inc", "$mul", "$rename", "$setOnInsert",
  "$set", "$unset", "$min", "$max", "$currentDate", "$limit", "$skip", "$or", "$and"
]

const validateForm: (value: any, form: IForm, params: IParametersBase) => Promise<any> =
async (value, form, params) => {
  if (isObject(params)) {
    if (isNil(params.form)) {
      params.form = form
    }
    switch (params.method) {
      case Method.Find: {
        return validateQueryObject(value, form, params)
        break
      }
      case Method.Update: {
        try {
          const newRes = await checkForFieldInSubKeys(value, form, params, updateArrayOperators)
          return newRes
        } catch (e) {
          if (e !== -1) {
            throw e
          }
        }
        break
      }
    }
  }
  const validatedObject = {}
  const fields = await getPermittedFields(form, params, true)
  if (fields.length === 0) {
      return Promise.resolve(validatedObject)
  }
  const formError: IFormError = {
    model: form.model,
    errors: []
  }

  for (const field of fields) {
    try {
      const newVal = await validateField(get(value, field.mapTo), field, params)
      if (!isNil(newVal)) {
        set(validatedObject, field.mapTo, newVal)
      }
    } catch (e) {
      formError.errors.push(e)
    }
  }
  if (formError.errors.length > 0) {
    return Promise.reject(formError)
  }
  const method = isObject(params) && isString(params.method) ? params.method : ``
  if (method === Method.Update && keys(validatedObject).length === 0) {
    return Promise.reject({model: form.model, errors: [{
      model: `none`, type: ErrorType.emptyUpdate
    }]})
  }
  const requireOwner = getRequireOwner(form, method)
  if (isString(requireOwner)) {
    const idPath: any = params.idPath
    set(validatedObject, requireOwner, get(params.currentUser, idPath))
  }
  return Promise.resolve(validatedObject)
}

export default validateForm
