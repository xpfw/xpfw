import { JSONSchemaDefinition } from "../jsonschema"
import FormStore from "../store/form"
import useObject from "./object"

const objectDefinition = {
  type: "object",
  title: "myObject",
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
    expect(useObject(objectDefinition, valueToSet, "prefix")).toMatchSnapshot("generated subschemas with prefix")
    expect(useObject(objectDefinition)).toMatchSnapshot("generated subschemas without mapTo and prefix")
  })
})
