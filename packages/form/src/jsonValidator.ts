import jsonValidatorCreator from "ajv"

const jsonValidator = new jsonValidatorCreator()
jsonValidator.addFormat("password", () => true)
export default jsonValidator
