import jsonValidatorCreator, { Ajv } from "ajv"

const jsonValidator: Ajv = new jsonValidatorCreator()
jsonValidator.addFormat("password", () => true)
export default jsonValidator
export {
  Ajv
}