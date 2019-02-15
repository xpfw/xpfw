import { JSONSchemaDefinition } from "../jsonschema"
import FormStore from "../store/form"
import { useField, useFieldWithValidation} from "./field"

const stringScheme: JSONSchemaDefinition = {
  type: "string"
}
const numberScheme: JSONSchemaDefinition = {
  type: "number"
}

describe("Form Hooks Test", () => {
  it("useField", () => {
    const valueToSet = "myStringValue"
    const valueOne = "theFirstValue"
    const valueTwo = "mySecondVal"
    FormStore.setValue(valueToSet,  valueOne)
    let stringHook = useField(valueToSet)
    expect(stringHook.value).toBe(valueOne)
    stringHook.setValue(valueTwo)
    stringHook = useField(valueToSet)
    expect(stringHook.value).toBe(valueTwo)
  })
  it("useFieldWithValidation", () => {
    const valueToSet = "myNumberValue"
    const valueOne = "theFirstValue"
    const valueTwo = 42
    numberScheme.title = valueToSet
    // set valid value
    let numberHook = useFieldWithValidation(numberScheme)
    numberHook.setValue(valueTwo)
    numberHook = useFieldWithValidation(numberScheme, valueToSet)
    expect(numberHook.value).toBe(valueTwo)
    expect(numberHook.error).toMatchSnapshot(" no error because valid number ")
    // set invalid value
    numberHook.setValue(valueOne)
    numberHook = useFieldWithValidation(numberScheme, valueToSet)
    expect(numberHook.value).toBe(valueOne)
    const initialError = numberHook.error
    expect(numberHook.error).toMatchSnapshot("Error because not a valid number instead it's a string")
    // set valid value with prefix while previous value should stay untouched due to the prefix in use
    let withPrefix = useFieldWithValidation(numberScheme, valueToSet, "myPrefixValue")
    withPrefix.setValue(valueTwo)
    numberHook = useFieldWithValidation(numberScheme, valueToSet)
    expect(numberHook.value).toBe(valueOne)
    expect(initialError).toBe(numberHook.error)
    withPrefix = useFieldWithValidation(numberScheme, valueToSet, "myPrefixValue")
    expect(withPrefix.value).toBe(valueTwo)
  })
})
