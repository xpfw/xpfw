
export declare interface ValidationKeywords {
  [prop: string]: boolean
}
export declare interface Args {
  ref: boolean
  aliasRef: boolean
  topRef: boolean
  titles: boolean
  defaultProps: boolean
  noExtraProps: boolean
  propOrder: boolean
  typeOfKeyword: boolean
  required: boolean
  strictNullChecks: boolean
  ignoreErrors: boolean
  out: string
  validationKeywords: string[]
  include: string[]
  excludePrivate: boolean
  uniqueNames: boolean
  rejectDateType: boolean
  id: string
}
export declare type PartialArgs = Partial<Args>
export declare type PrimitiveType = number | boolean | string | null
export declare interface JSONSchemaDefinition {
  $ref?: string
  $schema?: string
  $id?: string
  description?: string
  allOf?: JSONSchemaDefinition[]
  oneOf?: JSONSchemaDefinition[]
  anyOf?: JSONSchemaDefinition[]
  title?: string
  type?: string | string[]
  definitions?: {
      [key: string]: any;
  }
  format?: string
  items?: JSONSchemaDefinition | JSONSchemaDefinition[]
  minItems?: number
  additionalItems?: {
      anyOf: JSONSchemaDefinition[];
  } | JSONSchemaDefinition
  enum?: PrimitiveType[] | JSONSchemaDefinition[]
  default?: PrimitiveType | Object
  additionalProperties?: JSONSchemaDefinition | boolean
  required?: string[]
  propertyOrder?: string[]
  properties?: {
      [key: string]: JSONSchemaDefinition | undefined;
  }
  defaultProperties?: string[]
  patternProperties?: {
      [pattern: string]: JSONSchemaDefinition;
  }
  typeof?: "function"
}

export interface ISelectItem {
  /**
   * will be displayed in the user interface
   */
  label: string
  /**
   * will be used to set the value
   */
  value: any
}

export type SelectOptionGetter = (state: any) => ISelectItem[]

export type SelectOptionsField = ISelectItem[] | SelectOptionGetter

export declare interface ExtendedJSONSchema extends JSONSchemaDefinition {
  /**
   * `selectOptions` allows rendering a `<select>` in react or a `Picker` in react-native.
   *  Set the `type`-key to `number` or `string` and set the `format`-key to `select` in the JSONSchemaDefintion.
   *  It's value should be either an object or a function returning an object.
   * The object is expected to have a `value`-key which will be used to set the value
   * as well as `label`-key which will be displayed in the user interface.
   */
  selectOptions?: SelectOptionsField
  /**
   * Apply a theme to a field
   * Could for example be used to render custom components per field
   */
  theme?: string
}
