# Theming

Theming a validation type is possible by writing a [React Component](https://reactjs.org/docs/react-component.html) and registering it in the `ComponentRegistry` via `registerComponent`
```typescript
import { ComponentRegistry } from "@xpfw/form"
ComponentRegistry.registerComponent(FieldType.Number, "guided", GuidedNumbersField)
```
With this we have registered a theme named `guided` for the `Number`-FieldType.
To render a number field with said theme pass the `theme`-property to a `SharedField`.

```typescript
import { SharedField } from "@xpfw/form"

const RenderThemed = () => <SharedField 
  schema={{title: "myGuidedNumber", type: "number"}}
  theme="guided"
/>
```
> [Click here](https://xpfw.github.io/form) to see a live demo of this example field component

This is the code for the registered component.
```typescript
import { ComponentRegistry, IFieldProps, memo, useFieldWithValidation } from "@xpfw/form"
import { observer } from "mobx-react-lite"
import * as React from "react"

const GuidedNumbersField: React.FunctionComponent<IFieldProps> = observer((props) => {
  const fieldProps = useFieldWithValidation(props.schema, props.mapTo, props.prefix)
  const memoVals = [props.mapTo, props.prefix, JSON.stringify(props.schema)]
  const randomize = memo(() => () => fieldProps.setValue(Math.round(Math.random() * 100)), memoVals)
  React.useEffect(randomize, memoVals)
  return (
    <div className="is-flex centerJustify has-text-centered is-size-5 marginTop marginBottom">
      <a className="button" onClick={() => {
        fieldProps.setValue(fieldProps.value - 1)
      }}>Decrease</a>
      <span style={{marginRight: "1rem", marginLeft: "1rem"}}>Value of <i>{props.schema.title}</i> is: <b>{fieldProps.value}</b></span>
      <a className="button" onClick={() => {
        fieldProps.setValue(fieldProps.value + 1)
      }}>Increase</a><a style={{marginLeft: "1rem"}} className="button" onClick={randomize}>Randomize</a>
    </div>
  )
})
```
