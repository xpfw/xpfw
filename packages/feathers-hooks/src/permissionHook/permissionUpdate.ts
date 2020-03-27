import { Method } from "../globals"
import { PermissionHook } from "../typeDef"
import generalPermissionHook from "./generalPermissionHook"

const permissionUpdate: PermissionHook = (form, params) => {
  return generalPermissionHook(form, Method.Update, params)
}

export default permissionUpdate
