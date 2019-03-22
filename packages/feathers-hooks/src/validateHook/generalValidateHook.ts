import { Hook } from "@feathersjs/feathers"
import {
  jsonValidator
} from "@xpfw/form"
import { get, isNil, isObject, isString, set } from "lodash"
import { GeneralValidateHook } from "../typeDef"

const generalValidateHook: GeneralValidateHook = (schema, method, params) => {
  const paste = isObject(params) ? params : {}
  const getFrom = method === "find" ? "params.query" : "data"
  const validationHook: Hook = async (hook) => {
    const value = get(hook, getFrom)
    if (isObject(value)) {
      const currentUser =  get(hook, "params.user")
      const idPath: any = get(paste, "idPath", "id")
      const id = get(currentUser, idPath)
      if (!isNil(id) && !isString(id)) {
        set(currentUser, idPath, id.toString())
      }
      set(hook, getFrom, jsonValidator.validate(schema, value))
    }
    return hook
  }
  return validationHook
}

export default generalValidateHook
