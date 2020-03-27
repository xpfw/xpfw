# Stacks

XPFW was mainly developed with [feathers](http://feathersjs.com/) and [NeDB](https://github.com/louischatriot/nedb/) in mind.
Nevertheless it was written so that it can be easily connected to any backend via the `IBackendClient` interface.
The implementation of the [NeDB](https://github.com/xpfw/xpfw/blob/v1rewrite/packages/data-nedb/src/nedb.ts) and [feathers](https://github.com/xpfw/xpfw/blob/v1rewrite/packages/data-feathers/src/feathers.ts) client offer a great example on how to do on and offline backends!