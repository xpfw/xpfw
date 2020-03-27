import { Method } from "../globals"
import { ValidateHook } from "../typeDef"
import generalValidateHook from "./generalValidateHook"

const validateFind: ValidateHook = (form, params) => {
  return generalValidateHook(form, Method.Find, params)
}

export default validateFind
