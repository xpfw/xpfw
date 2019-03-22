import { HookContext } from "@feathersjs/feathers"
import { GeneralValidateHook, ValidateHook } from "./../typeDef"
import general from "./generalValidateHook"
import validateCreate from "./validateCreate"
import validateFind from "./validateFind"
import validateUpdate from "./validateUpdate"

const exportObj: {
  general: GeneralValidateHook,
  update: ValidateHook,
  create: ValidateHook,
  find: ValidateHook
} = {
  create: validateCreate,
  update: validateUpdate,
  find: validateFind,
  general
}

export default exportObj
export {
  HookContext
}
