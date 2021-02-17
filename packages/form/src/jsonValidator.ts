import Ajv from "ajv"
import addFormats from "ajv-formats"

const jsonValidator: Ajv = new Ajv({strict: false})
addFormats(jsonValidator)
jsonValidator.addFormat("password", () => true)
jsonValidator.addKeyword("collection")
export default jsonValidator
export { Ajv }