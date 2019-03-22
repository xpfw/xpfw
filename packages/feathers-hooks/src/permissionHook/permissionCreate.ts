import { Method } from "../globals"
import { ValidateHook } from "../typeDef"
import generalPermissionHook from "./generalPermissionHook"

const permissionCreate: ValidateHook = (form, parameters) => {
  return generalPermissionHook(form, Method.Create, parameters)
}

export default permissionCreate
