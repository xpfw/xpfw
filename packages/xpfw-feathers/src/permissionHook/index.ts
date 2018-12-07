import { HookContext } from "@feathersjs/feathers"
import { globals, IForm, IParameters } from "@xpfw/validate"
import { GeneralValidateHook, ValidateHook } from "./../typeDef"
import general from "./generalPermissionHook"
import create from "./permissionCreate"
import get from "./permissionGet"
import remove from "./permissionRemove"
import update from "./permissionUpdate"

const exportObj: {
  general: GeneralValidateHook,
  get: ValidateHook,
  remove: ValidateHook,
  update: ValidateHook,
  create: ValidateHook
} = {
  general, get, remove, update, create
}

export default exportObj

export {
  HookContext
}
