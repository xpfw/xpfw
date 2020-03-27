import { ExtendedJSONSchema } from "../jsonschema"
import SchemaRegistry from "./schemaRegistry"

describe("SchemaRegistry Test", () => {
  it("get and register schema", () => {
    const s: ExtendedJSONSchema = {collection: "BLA"}
    expect(SchemaRegistry.getSchema(String(s.collection))).toBe(undefined)
    SchemaRegistry.registerSchema(s)
    expect(SchemaRegistry.getSchema(String(s.collection))).toBe(s)
  })
})
