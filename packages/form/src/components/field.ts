import { action } from "mobx"
import { JSONSchemaDefinition } from "../jsonschema"
import jsonValidator from "../jsonValidator"
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

const useFieldWithValidation = (name: string, definition: JSONSchemaDefinition, prefix?: string) => {
  const originalWrapped = useField(name, definition, prefix)
  const setValue = action ((newValue: any) => {
    originalWrapped.setValue(newValue)
    const validationResults = jsonValidator.validate(definition, newValue)
    if (validationResults === false) {
      FormStore.setError(name, jsonValidator.errors, prefix)
    }
  })
  return {
    value: originalWrapped.value, setValue,
    error: FormStore.getError(name, prefix)
  }
}

export {
  useField, useFieldWithValidation
}
