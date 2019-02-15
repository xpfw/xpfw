[JSON-Schema](https://jsonschema.org) is used as a basis for validation.
Because some use cases handled by xpfw are not covered in JSONSchema yet the following additional keywords have been added to it.
The documentation of these keys can also be accessed by using the interface ExtendedJSONSchema.

#  selectOptions
`selectOptions` allows rendering a `<select>` in react or a `Picker` in react-native.
Set the `type`-key to `number` or `string` and set the `format`-key to `select` in the JSONSchemaDefintion.
It's value should be either an object or a function returning an object.
The object is expected to have a `value`-key which will be used to set the value as well as `label`-key which will be displayed in the user interface.