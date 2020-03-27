import { Method } from "../globals"
import { ValidateHook } from "../typeDef"
import generalValidateHook from "./generalValidateHook"

const validateUpdate: ValidateHook = (form) => {
  return generalValidateHook(form, Method.Update)
}

export default validateUpdate
