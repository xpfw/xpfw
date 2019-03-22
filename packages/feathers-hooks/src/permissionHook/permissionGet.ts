import { Method } from "../globals"
import { ValidateHook } from "../typeDef"
import generalPermissionHook from "./generalPermissionHook"

const permissionGet: ValidateHook = (form, params) => {
  return generalPermissionHook(form, Method.Get, params)
}

export default permissionGet
