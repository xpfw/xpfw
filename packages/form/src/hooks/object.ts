import { cloneDeep } from "lodash-es"
import { ExtendedJSONSchema } from "../jsonschema"
import { IFieldProps } from "../store/componentRegistry"
import iterateSubfields from "../util/iterateSubfields"
import { prependPrefix } from "../util/prefixMaker"

/**
 * Helper function to render object types
 * @param mapTo key where the value of the field will be saved. uses lodash.get/set string syntax style so subfields, array indices etc. can be used within the string
 * @param objectDefinition JSONSchema for the type object. It is expected that the properties Field exists
 * @param prefix prepended to mapTo to allow same mapTo keys to have different values
 */
const useObject = (objectDefinition: ExtendedJSONSchema, mapTo?: string, prefix?: string) => {
  const fields: IFieldProps[] = []
  const overWriteTitle = mapTo == null
  if (overWriteTitle) {
    mapTo = objectDefinition.title
  }
  iterateSubfields(objectDefinition, (key, subSchema) => {
    const prepended = prependPrefix(key, mapTo)
    const schema = overWriteTitle ? cloneDeep(subSchema) : subSchema
    if (overWriteTitle) {
      schema.title = prepended
    }
    fields.push({
      mapTo: prepended,
      prefix, schema
    })
  })
  return {fields}
}

export default useObject
