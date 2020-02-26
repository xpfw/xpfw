# NeDB

If you want to write an offline application `@xpfw/data-nedb` is the adapter you are looking for.

Overwrite the client property of `BackendClient` and your xpfw powered offline application is ready to go.

```typescript
import { BackendClient } from '@xpfw/data';
import NedbClient from '@xpfw/data-nedb';
BackendClient.client = NedbClient
```