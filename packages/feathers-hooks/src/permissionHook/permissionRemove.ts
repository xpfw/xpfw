import { Method } from "../globals"
import { PermissionHook } from "../typeDef"
import generalPermissionHook from "./generalPermissionHook"

const permissionRemove: PermissionHook = (form, params) => {
  return generalPermissionHook(form, Method.Remove, params)
}

export default permissionRemove
