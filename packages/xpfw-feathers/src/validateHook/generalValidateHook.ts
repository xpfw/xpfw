import { Hook } from "@feathersjs/feathers"
import ValidationRegistry, {
  globals, validateForm
} from "@xpfw/validate"
import { get, isNil, isObject, isString, set } from "lodash"
import { GeneralValidateHook } from "../typeDef"

const generalValidateHook: GeneralValidateHook = (form, method, params) => {
  const paste = isObject(params) ? params : {}
  const getFrom = method === globals.Method.Find ? "params.query" : "data"
  const validationHook: Hook = async (hook) => {
    const value = get(hook, getFrom)
    if (isObject(value)) {
      const currentUser =  get(hook, "params.user")
      const idPath = get(paste, "idPath", "id")
      const id = get(currentUser, idPath)
      if (!isNil(id) && !isString(id)) {
        set(currentUser, idPath, id.toString())
      }
      set(hook, getFrom, await validateForm(value, form, {
        ...paste,
        registry: ValidationRegistry,
        method, form,
        currentUser
      }))
    }
    return hook
  }
  return validationHook
}

export default generalValidateHook
