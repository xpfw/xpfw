# Usage

To render a field use the `SharedField` component and pass it your [`IField` definition](/core/definitions.md)

```typescript
import { FieldType } from "@xpfw/validate"
import { SharedField } from "@xpfw/form-shared"
import { registerComponents } from "@xpfw/form-bulma"
// Making sure that @xpfw/form-shared can find components
registerComponents()
class StaticFieldRenderer extends React.Component<any, any> {
  public render() {
    return <SharedField field={{mapTo: "myField", type: FieldType.Text}} />
  }
}
```
Rendering a form is achieved by iterating over it's fields and rendering them in a `SharedField`.

If you require readily usable create / edit pages and more check out [@xpfw/ui](/ui/usage.md).
```typescript
import { SharedField } from "@xpfw/form-shared"
import { registerComponents } from "@xpfw/form-bulma"
// Making sure that @xpfw/form-shared can find components
registerComponents()
class IFormRenderer extends React.Component<{
  form: IForm
}, any> {
  public render() {
    const fieldDefs = getFieldsFromForm(this.props.form)
    const fields = fieldDefs.map((field: IField) => {
      return <SharedField key={field.mapTo} field={field} />
    })
    return (
      <div>
        {fields}
      </div>
    )
  }
}
```
> #### Info::See it in action
> [Click here](https://xpfw.github.io/form) to see a live demo of this example