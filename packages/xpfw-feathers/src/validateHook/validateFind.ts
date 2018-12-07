import { globals } from "@xpfw/validate"
import { ValidateHook } from "../typeDef"
import generalValidateHook from "./generalValidateHook"

const validateFind: ValidateHook = (form, params) => {
  return generalValidateHook(form, globals.Method.Find, params)
}

export default validateFind
