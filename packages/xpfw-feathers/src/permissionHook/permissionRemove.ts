
import { globals } from "@xpfw/validate"
import { ValidateHook } from "../typeDef"
import generalPermissionHook from "./generalPermissionHook"

const permissionRemove: ValidateHook = (form, params) => {
  return generalPermissionHook(form, globals.Method.Remove, params)
}

export default permissionRemove
