import { Method } from "../globals"
import { PermissionHook } from "../typeDef"
import generalPermissionHook from "./generalPermissionHook"

const permissionGet: PermissionHook = (form, params) => {
  return generalPermissionHook(form, Method.Get, params)
}

export default permissionGet
