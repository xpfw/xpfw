import { JSONSchemaDefinition } from "../jsonschema"
import FormStore from "../store/form"

const useField = (name: string, definition: JSONSchemaDefinition, prefix?: string) => {
  const value = FormStore.getValue(name, prefix)
  const setValue = (newValue: any) => {
    FormStore.setValue(name, newValue, prefix)
  }
  return {
    value, setValue
  }
}

export {
  useField
}
