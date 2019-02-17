import { ExtendedJSONSchema } from "../jsonschema"

const iterateSubFields =
(schema: ExtendedJSONSchema, callback: (key: string, subSchema: ExtendedJSONSchema) => void) => {
  let toIterate: any = null
  if (schema != null && schema.properties != null) {
    toIterate = schema.properties
  }
  if (schema != null && schema.items != null) {
    toIterate = schema.items
  }
  for (const key of Object.keys(toIterate)) {
    callback(key, toIterate[key])
  }
}

export default iterateSubFields