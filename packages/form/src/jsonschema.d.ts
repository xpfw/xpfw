
export declare type ValidationKeywords = {
  [prop: string]: boolean;
};
export declare type Args = {
  ref: boolean;
  aliasRef: boolean;
  topRef: boolean;
  titles: boolean;
  defaultProps: boolean;
  noExtraProps: boolean;
  propOrder: boolean;
  typeOfKeyword: boolean;
  required: boolean;
  strictNullChecks: boolean;
  ignoreErrors: boolean;
  out: string;
  validationKeywords: string[];
  include: string[];
  excludePrivate: boolean;
  uniqueNames: boolean;
  rejectDateType: boolean;
  id: string;
};
export declare type PartialArgs = Partial<Args>;
export declare type PrimitiveType = number | boolean | string | null;
export declare type JSONSchemaDefinition = {
  $ref?: string;
  $schema?: string;
  $id?: string;
  description?: string;
  allOf?: JSONSchemaDefinition[];
  oneOf?: JSONSchemaDefinition[];
  anyOf?: JSONSchemaDefinition[];
  title?: string;
  type?: string | string[];
  definitions?: {
      [key: string]: any;
  };
  format?: string;
  items?: JSONSchemaDefinition | JSONSchemaDefinition[];
  minItems?: number;
  additionalItems?: {
      anyOf: JSONSchemaDefinition[];
  } | JSONSchemaDefinition;
  enum?: PrimitiveType[] | JSONSchemaDefinition[];
  default?: PrimitiveType | Object;
  additionalProperties?: JSONSchemaDefinition | boolean;
  required?: string[];
  propertyOrder?: string[];
  properties?: {
      [key: string]: any;
  };
  defaultProperties?: string[];
  patternProperties?: {
      [pattern: string]: JSONSchemaDefinition;
  };
  typeof?: "function";
};