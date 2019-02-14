import { JSONSchemaDefinition } from "@xpfw/form"

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

export {
  NumberField, NameField, DateField, PwField
}
