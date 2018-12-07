import { globals } from "@xpfw/validate"
import { ValidateHook } from "../typeDef"
import generalValidateHook from "./generalValidateHook"

const validateUpdate: ValidateHook = (form) => {
  return generalValidateHook(form, globals.Method.Update)
}

export default validateUpdate
