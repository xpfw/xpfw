
import { globals } from "@xpfw/validate"
import { ValidateHook } from "../typeDef"
import generalPermissionHook from "./generalPermissionHook"

const permissionGet: ValidateHook = (form, params) => {
  return generalPermissionHook(form, globals.Method.Get, params)
}

export default permissionGet
