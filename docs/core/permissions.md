# Permissions
Permissions are usable, if you use **xpfw** in your backend.
That is the case if you [integrate it into your backend](/core/backend.md) or use one of the [suggested stacks](/stacks/overview.md).

To make use of them simply add the `permission`-key (see [FieldPermissionDef](#fieldpermissiondef) for full reference).

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
    mapTo: "ownedBy",
    type: FieldType.Text,
    validate: {required: {type: RequiredType.Always}}
  },{
    mapTo: "createdAt",
    type: FieldType.Date
  }]}],
  permissions: {
    required: {
      create: Permission.User,
      find: Permission.Owner,
      get: Permission.Owner,
      update: Permission.Owner,
      remove: Permission.Owner
    },
    requireOwner: "ownedBy"
  },
}
ValidationRegistry.registerForm(RecipeModel)
 ```
With these permissions only logged in users can create a Recipe and they can also only see the recipes they created.
Because checks like `Owner` require additional data `addBelongsTo` and `idPath` were also set.

Without customization the following permissions are supported:
- Permission.Guest => always true
- Permission.User => require someone to be logged in
- Permission.Owner => require someone to be the owner of an item
- Permission.Admin => require a user to have the ID Permission.Admin
- Permission.Server => require a user to have the ID Permission.Server

# Customization
If you need to do a more sophisticated permission check you can add a custom method via the `check`-key in the `permissions`-object. That way there are no limits to your permission checks :)
