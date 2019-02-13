import { JSONSchemaDefinition } from "../jsonschema"
import { prependPrefix } from "../util/prefixMaker"

export interface IobjectProperty {
  mapTo: string
  prefix?: string
  objectDefinition: JSONSchemaDefinition
}

/**
 * Helper function to render object types
 * @param mapTo key where the value of the field will be saved. uses lodash.get/set string syntax style so subfields, array indices etc. can be used within the string
 * @param objectDefinition JSONSchema for the type object. It is expected that the properties Field exists
 * @param prefix prepended to mapTo to allow same mapTo keys to have different values
 */
const useObject = (mapTo: string, objectDefinition: JSONSchemaDefinition, prefix?: string) => {
  const fields: IobjectProperty[] = []
  if (objectDefinition != null && objectDefinition.properties != null) {
    const u: any = objectDefinition.properties
    for (const key of Object.keys(u)) {
      fields.push({
        mapTo: prependPrefix(key, mapTo),
        prefix, objectDefinition: u[key]
      })
    }
  }
  return {fields}
}

export default useObject
