import { Method } from "../globals"
import { ValidateHook } from "../typeDef"
import generalPermissionHook from "./generalPermissionHook"

const permissionRemove: ValidateHook = (form, params) => {
  return generalPermissionHook(form, Method.Remove, params)
}

export default permissionRemove
