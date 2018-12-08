Definitions are descriptions of your data.
It's kind of like [JSON-Schema](https://jsonschema.org) with support for [permisisons](/core/permissions.md).

It is a simple definition that facilitates rendering [forms](/form/usage.md) and [CRUD-UI's](/ui/usage.md).
```js
import { FieldType, RequiredType, ValidationRegistry } from "@xpfw/validate"

const RecipeModel = {
  model: "recipeModel",
  collection: "recipes",
  sections: [{fields: [{
    mapTo: "name",
    type: FieldType.Text,
    validate: {required: {type: RequiredType.Always}}
  },{
    mapTo: "createdAt",
    type: FieldType.Date
  }]}]
}
ValidationRegistry.registerForm(RecipeModel)
```
To see all possible options look at the [IForm Interface](#iform)
// TODO: add more examples for string, number etc. with their respective options

# IForm

<a id="collection"></a>

## `<Optional>` collection

**● collection**: * `undefined` &#124; `string`
*



___
<a id="icon"></a>

## `<Optional>` icon

**● icon**: *`any`*



___
<a id="model"></a>

##  model

**● model**: *`string`*



___
<a id="multicollection"></a>

## `<Optional>` multiCollection

**● multiCollection**: *`string`[]*



___
<a id="options"></a>

## `<Optional>` options

**● options**: * `undefined` &#124; `object`
*



___
<a id="permissions"></a>

## `<Optional>` permissions

**● permissions**: *[IPermissionsForForm](interfaces/_xpfw_validate._typedef_.ipermissionsforform.md)*



___
<a id="sections"></a>

##  sections

**● sections**: *[IFormSection](interfaces/_xpfw_validate._typedef_.iformsection.md)[]*



___


# IField

↳  [IFieldSelect](interfaces/_xpfw_validate._typedef_.ifieldselect.md)

↳  [IFieldWithOptions](interfaces/_xpfw_validate._typedef_.ifieldwithoptions.md)

# Properties

<a id="mapto"></a>

##  mapTo

**● mapTo**: *`string`*



___
<a id="theme"></a>

## `<Optional>` theme

**● theme**: * `undefined` &#124; `string`
*



___
<a id="type"></a>

##  type

**● type**: * `string` &#124; `number`
*



___
<a id="validate"></a>

## `<Optional>` validate

**● validate**: *[IValidateOptions](interfaces/_xpfw_validate._typedef_.ivalidateoptions.md)*



___


___


# IValidateOptions

## Properties

<a id="convert"></a>

## `<Optional>` convert

**● convert**: *[FieldConvertFunc](modules/_xpfw_validate._typedef_.md#fieldconvertfunc)*



*__type__*: 

*__memberof__*: 

___
<a id="custom"></a>

## `<Optional>` custom

**● custom**: *[ValidateFunction](modules/_xpfw_validate._typedef_.md#validatefunction)*



*__type__*: 

*__memberof__*: 

___
<a id="customopts"></a>

## `<Optional>` customOpts

**● customOpts**: *`any`*



___
<a id="defaultvalue"></a>

## `<Optional>` defaultValue

**● defaultValue**: *`any`*



___
<a id="hide"></a>

## `<Optional>` hide

**● hide**: *[IFieldVisibilityDef](interfaces/_xpfw_validate._typedef_.ifieldvisibilitydef.md)*



___
<a id="match"></a>

## `<Optional>` match

**● match**: *`string`[]*



*__type__*: 

*__memberof__*: 

___
<a id="max"></a>

## `<Optional>` max

**● max**: * `undefined` &#124; `number`
*



*__type__*: 

*__memberof__*: 

___
<a id="min"></a>

## `<Optional>` min

**● min**: * `undefined` &#124; `number`
*



*__type__*: 

*__memberof__*: 

___
<a id="objectdef"></a>

## `<Optional>` objectDef

**● objectDef**: *[IField](interfaces/_xpfw_validate._typedef_.ifield.md)[]*



___
<a id="permission"></a>

## `<Optional>` permission

**● permission**: *[IPermTypes](interfaces/_xpfw_validate._typedef_.ipermtypes.md)*



___
<a id="relationshipcollection"></a>

## `<Optional>` relationshipCollection

**● relationshipCollection**: * `undefined` &#124; `string`
*



___
<a id="relationshipidpath"></a>

## `<Optional>` relationshipIdPath

**● relationshipIdPath**: * `undefined` &#124; `string`
*



___
<a id="relationshipnamepath"></a>

## `<Optional>` relationshipNamePath

**● relationshipNamePath**: * `undefined` &#124; `string`
*



___
<a id="required"></a>

## `<Optional>` required

**● required**: *[IValidateRequiredOptions](interfaces/_xpfw_validate._typedef_.ivalidaterequiredoptions.md)*



___
<a id="step"></a>

## `<Optional>` step

**● step**: * `undefined` &#124; `number`
*



*__type__*: 

*__memberof__*: 

___
<a id="type"></a>

## `<Optional>` type

**● type**: * `number` &#124; `string`
*



*__type__*: 

*__memberof__*: 

___
<a id="validate"></a>

## `<Optional>` validate

**● validate**: *[IValidateOptions](interfaces/_xpfw_validate._typedef_.ivalidateoptions.md)*



*__type__*: 

*__memberof__*: 

___

