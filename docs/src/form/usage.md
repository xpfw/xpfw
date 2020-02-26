# Usage
To render a field use the `SharedField` component and pass it your JSON-Schema.
> [Click here](https://xpfw.github.io/form) to see a live demo of `@xpfw/form`


```typescript
import { SharedField } from "@xpfw/form"
import { registerComponents } from "@xpfw/form-bulma"
// Making sure that @xpfw/form-shared can find components
registerComponents()
const StaticFieldRenderer = () => <SharedField field={{mapTo: "myField", type: FieldType.Text}} />
```

If you require readily usable create / edit pages and more check out [@xpfw/data](/data/usage.md).
