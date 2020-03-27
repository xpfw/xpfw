import { Method } from "../globals"
import { ValidateHook } from "../typeDef"
import generalValidateHook from "./generalValidateHook"

const validateCreate: ValidateHook = (form, params) => {
  return generalValidateHook(form, Method.Create, params)
}

export default validateCreate
