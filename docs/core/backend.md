# Backend Integration
Integrating **xpfw** into your existing backend, is a matter of adding two function calls and having [IForm definitions](/core/definitions.md) ready.
First we will add the `validatePermissions`, so that the form validation only has to be executed if permissions are granted.
Here is an example of a `validatePermission`-call integrated into a dream backend.
```typescript
import myBackend from "<yourCustomBackend>"
import {  validatePermission, TestDefs } from "@xpfw/validate"
const myBackendPermissionVerifier = async () => {
  const form = TestDefs.FormNumberAndRequiredText
  const user = myBackend.getCurrentUser()
  // if we are handling a create, get or update we want to be able to check the object at hand
  const objectAtHand = myBackend.getRequestedObjectById()
  const isPermitted = await validatePermission(user, {
    currentUser: user,
    doc: objectAtHand,
    docId: objectAtHand._id,
    form, method: "create"
  })
  if (isPermitted) {
    // execute your protected code
  } else {
    // throw permission error
  }
}
```
In case more inspiration is required you could look at how [@xpfw/feathers integrates this into feathers hooks](https://github.com/xpfw/xpfw/packages/xpfw-feathers/src/permissionHook/generalPermissionHook.ts)

# Validating

Thanks to the [IForm definition](/core/definitions.md) validating is doable with one asynchronous call of `valdiateForm`. All unknown object keys will be stripped by this call!

```js
import {  validateForm, TestDefs } from "@xpfw/validate"
validateForm({
  mySting: "will stay", for: "validation", willBe: "stripped away"
  }, TestDefs.FormNumberAndRequiredText).then((validatedObject) => {
    console.log("obj is ok, stripped version is: ", validatedString)
  }).catch((error) => {
    console.error("The following problems were found in the object", error)
  })
```
[@xpfw/feathers is one example of an actual integtration of `validateForm`.](https://github.com/xpfw/xpfw/packages/xpfw-feathers/src/validateHook/generalValidateHook.ts)


# Validating per Field
Validation is also possible to do on a per field Basis

```js
import {  validateField, TestDefs } from "@xpfw/validate"
validateField("i am string", TestDefs.RequiredTextField).then((validatedString) => {
    console.log("string was ok and is ", validatedString)
  }).catch((error) => {
    console.error("The following problems were found in the Field", error)
  })
```