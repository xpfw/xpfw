import { action } from "mobx"
import { JSONSchemaDefinition } from "../jsonschema"
import jsonValidator from "../jsonValidator"
import FormStore from "../store/form"

/**
 * Hook to acquire a value and a function to change it
 * @param mapTo key where the value of the field will be saved. uses lodash.get/set string syntax style so subfields, array indices etc. can be used within the string
 * @param prefix prepended to mapTo to allow same mapTo keys to have different values
 */
const useField = (mapTo: string, prefix?: string) => {
  const value = FormStore.getValue(mapTo, prefix)
  const setValue = (newValue: any) => {
    FormStore.setValue(mapTo, newValue, prefix)
  }
  return {
    /**
     * mobx tracked value of the field
     */
    value,
    /**
     * Set the fields value to the new value
     */
    setValue
  }
}

/**
 * Hook to acquire a value and a function to change it. Will validate `definition` using `ajv` and also return errors.
 * If mapTo is null definition.title will be used instead.
 * @param mapTo key where the value of the field will be saved. uses lodash.get/set string syntax style so subfields, array indices etc. can be used within the string
 * @param definition JSONSchema Definition for the value at hand
 * @param prefix prepended to mapTo to allow same mapTo keys to have different values
 * @returns
 */
const useFieldWithValidation = (definition: JSONSchemaDefinition, mapTo?: string, prefix?: string) => {
  const originalWrapped = useField(mapTo ? mapTo : String(definition.title), prefix)
  const setValue = action((newValue: any) => {
    originalWrapped.setValue(newValue)
    const validationResults = jsonValidator.validate(definition, newValue)
    if (validationResults === false) {
      FormStore.setError(mapTo, jsonValidator.errors, prefix)
    }
  })
  return {
    /**
     * mobx tracked value of the field
     */
    value: originalWrapped.value,
    /**
     * Set the fields value to the new value
     */
    setValue,
    /**
     * MobX tracked error of the field
     */
    error: FormStore.getError(mapTo, prefix)
  }
}

export {
  useField, useFieldWithValidation
}
