import { BadRequest } from "@feathersjs/errors"
import { Hook } from "@feathersjs/feathers"
import {
  jsonValidator, validateQueryObject
} from "@xpfw/form"
import { cloneDeep, get, isNil, isObject, isString, set } from "lodash"
import { GeneralValidateHook } from "../typeDef"

const generalValidateHook: GeneralValidateHook = (schema, method, params) => {
  const paste = isObject(params) ? params : {}
  const isFind = method === "find"
  const findSchema = cloneDeep(schema)
  if (findSchema.properties == null) {
    findSchema.properties = {}
  }
  findSchema.properties.$skip = {type: "number"}
  findSchema.properties.$limit = {type: "number"}
  findSchema.properties.$sort = {type: "object", additionalProperties: {type: "number"}}
  const getFrom =  isFind ? "params.query" : "data"
  const validationHook: Hook = async (hook) => {
    const value = get(hook, getFrom)
    if (value != null) {
      const currentUser =  get(hook, "params.user")
      const idPath: any = get(paste, "idPath", "id")
      const id = get(currentUser, idPath)
      if (!isNil(id) && !isString(id)) {
        set(currentUser, idPath, id.toString())
      }
      let newVal = value
      if (isFind) {
        newVal = await validateQueryObject(value, findSchema)
      } else {
        jsonValidator.validate(schema, value)
        if (jsonValidator.errors != null && jsonValidator.errors.length > 0) {
          throw new BadRequest(JSON.stringify(jsonValidator.errors))
        }
      }
      set(hook, getFrom, newVal)
    }
    return hook
  }
  return validationHook
}

export default generalValidateHook
