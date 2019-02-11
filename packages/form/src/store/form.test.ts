import { JSONSchemaDefinition } from "../jsonschema"
import FormStore from "./form"

const schema: JSONSchemaDefinition = {
  type: "string"
}

describe("Form Store Test", () => {
  it("Should behave as expected", () => {
    const valueToSet = "myVal"
    const valueOne = "theFirstValue"
    const valueTwo = "mySecondVal"
    FormStore.setValue(valueToSet, valueOne)
    expect(FormStore.getValue(valueToSet)).toBe(valueOne)
    expect(FormStore.getValue(valueToSet)).not.toBe(valueTwo)
    FormStore.setValue(valueToSet, valueTwo)
    expect(FormStore.getValue(valueToSet)).not.toBe(valueOne)
    expect(FormStore.getValue(valueToSet)).toBe(valueTwo)
  })
})
