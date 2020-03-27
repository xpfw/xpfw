import { ExtendedJSONSchema, getMapTo, iterateSubFields, prependPrefix, useFieldWithValidation } from "@xpfw/form"

const makeSubFields = (schema: ExtendedJSONSchema, mapTo?: string, prefix?: string) => {
  const ownField = useFieldWithValidation(schema, mapTo, prefix)
  mapTo = getMapTo(schema, mapTo)
  const subFields: {[index: string]: {value: any, setValue: Function}} = {
    [String(schema.title)]: ownField
  }
  iterateSubFields(schema, (key, subSchema) => {
    subFields[key] = useFieldWithValidation(subSchema, key, prependPrefix(mapTo, prefix))
  })
  return subFields
}

export default makeSubFields
