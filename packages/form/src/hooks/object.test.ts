import { JSONSchemaDefinition } from "../jsonschema"
import FormStore from "../store/form"
import useObject from "./object"

const objectDefinition = {
  type: "object",
  properties: {
    checked: {
      type: "boolean"
    },
    id: {
      type: "integer"
    },
    name: {
      type: "string"
    }
  }
}

describe("Form Hooks Test", () => {
  it("useObject", () => {
    const valueToSet = "myStringValue"
    const objectHelper = useObject(valueToSet, objectDefinition)
    expect(objectHelper).toMatchSnapshot("Before anything")
  })
})
