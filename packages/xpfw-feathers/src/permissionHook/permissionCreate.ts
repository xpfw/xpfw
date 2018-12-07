
import { globals } from "@xpfw/validate"
import { ValidateHook } from "../typeDef"
import generalPermissionHook from "./generalPermissionHook"

const permissionCreate: ValidateHook = (form, parameters) => {
  return generalPermissionHook(form, globals.Method.Create, parameters)
}

export default permissionCreate
