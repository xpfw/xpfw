# NeDB

If you want to write an offline application `@xpfw/ui-nedb` is the adapter you are looking for.

Overwrite the client property of `BackendClient` and your xpfw powered offline application is ready to go.

```typescript
import { BackendClient } from '@xpfw/ui-shared';
import NedbClient from '@xpfw/ui-nedb';
BackendClient.client = NedbClient
```