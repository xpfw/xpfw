# IBackendClient

Connecting your own backend to *xpfw* is done by implementing the `IBackendClient` interface.

The implementation of the [NeDB](https://github.com/xpfw/xpfw/blob/v1rewrite/packages/data-nedb/src/nedb.ts) and [feathers](https://github.com/xpfw/xpfw/blob/v1rewrite/packages/data-feathers/src/feathers.ts) client offer a great example on how to do on and offline backends!

For an offline plugin you only need to implement
- `get`
- `create`
- `remove`
- `find`
- `patch`

For an online plugin you also need to implement
- `connectTo`
- `disconnect`
- `login`
- `register`
- `logout`

Since *xpfw* is strongly typed your IDE should tell you what parameters to expect. In case you are not using typescript see an abstract from the API docs below.
