import { ExtendedJSONSchema, JSONSchemaDefinition } from "@xpfw/form"

const DateField: JSONSchemaDefinition = {
  title: "dateVal",
  type: "string",
  format: "date"
}

const PwField: JSONSchemaDefinition = {
  title: "passportWellYou",
  type: "string",
  format: "password"
}

const NumberField: JSONSchemaDefinition = {
  type: "number",
  title: "myVal"
}

const NameField: JSONSchemaDefinition = {
  type: "string",
  title: "guestName"
}

const SelectField: ExtendedJSONSchema = {
  title: "selectMeVal",
  type: "number",
  format: "select",
  selectOptions: [
    {label: "c", value: 4},
    {label: "a", value: 2}
  ]
}

const LocationField: ExtendedJSONSchema = {
  title: "valOfBool",
  type: "array",
  theme: "location",
  items: {
    type: "number"
  }
}

const ObjectField: JSONSchemaDefinition = {
  type: "object",
  title: "objectKey",
  properties: {
    [String(NumberField.title)]: NumberField,
    secondNum: NumberField
  }
}

const BooleanField: JSONSchemaDefinition = {
  title: "valOfBool",
  type: "boolean"
}

const ArrayField: JSONSchemaDefinition = {
  title: "myArray",
  type: "array",
  items: {
    type: "string"
  }
}

export {
  ArrayField, BooleanField, DateField, LocationField, NameField,
  NumberField, ObjectField, PwField, SelectField
}
