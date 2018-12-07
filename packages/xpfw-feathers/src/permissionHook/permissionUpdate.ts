
import { globals } from "@xpfw/validate"
import { ValidateHook } from "../typeDef"
import generalPermissionHook from "./generalPermissionHook"

const permissionUpdate: ValidateHook = (form, params) => {
  return generalPermissionHook(form, globals.Method.Update, params)
}

export default permissionUpdate
