import { Method } from "../globals"
import { ValidateHook } from "../typeDef"
import generalPermissionHook from "./generalPermissionHook"

const permissionUpdate: ValidateHook = (form, params) => {
  return generalPermissionHook(form, Method.Update, params)
}

export default permissionUpdate
