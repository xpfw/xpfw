# Feathers

*xpfw* was initially written for `feathers`, but later this was exchanged by `IBackendClient` to prevent lock-in.

If you already took care of your backend you can use `@xpfw/ui-feathers` like this

```typescript
import { FeathersClient } from "@xpfw/ui-feathers"
import { BackendClient, UserStore } from "@xpfw/ui-shared"

BackendClient.client = FeathersClient

BackendClient.client.connectTo("yourBackend.com", {
    // For react-native replace with AsyncStorage
    authOptions: {storage: get(global, "window.localStorage")},
    userStore: UserStore
})
```

## Backend Integration
If you want to use feathers as your backend theres `@xpfw/feathers`
Add the `permission` and `validate` hooks to your database services and you're set.
A code example can be found in [XpStats code](https://github.com/xpfw/xpstat/isofw-node/src/services/pluginCollections.ts) and a feathers independent explanation can be found [here](/core/backend.md).