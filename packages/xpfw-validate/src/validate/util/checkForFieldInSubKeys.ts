import { each, get, isObject, keys, set } from "lodash"
import { ErrorType, FieldType, Method } from "../../globals"
import { IField, IForm, IFormError, IParametersBase } from "../../typeDef"
import { getFieldsFromForm } from "../../util/form"
import isAllowedSpecialQueryKey from "./isAllowedSpecialQueryKey"

const checkForMongoArrayOperators: (value: any, form: IForm, params: IParametersBase, arrayOperators: string[])
=> Promise<any> = (value, form, params, arrayOperators) => {
  for (const arrayOperator of arrayOperators) {
    const pushArgs: any = get(value, arrayOperator)
    if (isObject(pushArgs)) {
      const newPushArgs: any = {}
      each(getFieldsFromForm(form), (field) => {
        breakOut: for (const key in pushArgs) {
          if (isAllowedSpecialQueryKey(key, field)) {
            newPushArgs[key] = pushArgs[key]
            break breakOut
          }
        }
      })
      if (keys(newPushArgs).length === 0) {
        return Promise.reject(`no valid keys in ${arrayOperator}`)
      }
      const newObj = {}
      set(newObj, arrayOperator, newPushArgs)
      return Promise.resolve(newObj)
    }
  }
  return Promise.reject(-1)
}

export default checkForMongoArrayOperators
