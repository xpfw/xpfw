import { ExtendedJSONSchema } from "../jsonschema"

export class SchemaRegistryClass {
  public schemas: {[index: string]: ExtendedJSONSchema | undefined} = {}
  public getSchema = (collection: string) => this.schemas[collection]
  public registerSchema = (schema: ExtendedJSONSchema) => this.schemas[String(schema.collection)] = schema
}

const SchemaRegistry = new SchemaRegistryClass()

export default SchemaRegistry
