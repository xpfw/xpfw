# Frontend

*xpfw* was initially written for [feathers](http://feathersjs.com/), but later this was exchanged by `IBackendClient` to prevent lock-in.

If you have a working feathers backend you can use `@xpfw/data-feathers` like this

```typescript
import { BackendClient, UserStore } from "@xpfw/data"
import { FeathersClient } from "@xpfw/data-feathers"

BackendClient.client = FeathersClient

BackendClient.client.connectTo("yourBackend.com", {
    // For react-native replace with AsyncStorage
    authOptions: {storage: get(global, "window.localStorage")},
    userStore: UserStore
})
```

# Backend
If you want to use feathers as backend with xpfw we provide the `@xpfw/feathers-hooks` package.
Add the `permission` and `validate` hooks to your database services and you're all set!
```typescript
import { permission, validate } from "@xpfw/feathers-hooks"
import { Application } from "@feathersjs/feathers"

// use with app.configure(xpfwConfiguration)
const xpfwConfiguration = (app: Application) => {
  const service = app.service("users")
  service.hooks({
    before: {create: [
        permission.create(permissions),
        validate.general(schema, "create")
    ]}})
}

import { IPermissionSchema, Permission } from "@xpfw/permission"
import { ExtendedJSONSchema } from "@xpfw/form"
const permissions: IPermissionSchema = {
  required:{
    create:Permission.Public,
    update:Permission.User
  }
}
const schema: ExtendedJSONSchema = {
  title: "userModel",
  collection: "users",
  properties: {
    "email": {type: "string"},
    "password": {type: "string"}
  }
}
```