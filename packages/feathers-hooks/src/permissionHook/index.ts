import { HookContext } from "@feathersjs/feathers"
import { GeneralPermissionHook, PermissionHook } from "./../typeDef"
import general from "./generalPermissionHook"
import create from "./permissionCreate"
import get from "./permissionGet"
import remove from "./permissionRemove"
import update from "./permissionUpdate"

const exportObj: {
  general: GeneralPermissionHook,
  get: PermissionHook,
  remove: PermissionHook,
  update: PermissionHook,
  create: PermissionHook
} = {
  general, get, remove, update, create
}

export default exportObj

export {
  HookContext
}
