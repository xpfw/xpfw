import { Method } from "../globals"
import { PermissionHook } from "../typeDef"
import generalPermissionHook from "./generalPermissionHook"

const permissionCreate: PermissionHook = (form, parameters) => {
  return generalPermissionHook(form, Method.Create, parameters)
}

export default permissionCreate
