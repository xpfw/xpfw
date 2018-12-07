import { globals } from "@xpfw/validate"
import { ValidateHook } from "../typeDef"
import generalValidateHook from "./generalValidateHook"

const validateCreate: ValidateHook = (form, params) => {
  return generalValidateHook(form, globals.Method.Create, params)
}

export default validateCreate
