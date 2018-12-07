# Theming

Theming a validation type is possible by writing a [React Component](https://reactjs.org/docs/react-component.html) and registering it in the `ComponentRegistry` via `registerComponent`
```js
ComponentRegistry.registerComponent(FieldType.Number, "guided", GuidedNumbersField)
```
With this we have registered a theme named `guided` for the `Number`-FieldType.
To render a number field with said theme simply pass the `theme`-property to a `SharedField`.

```jsx
<SharedField 
  field={{mapTo: "myGuidedNumber", type: FieldType.Number}}
  theme="guided"
/>
```
> #### Info::See it in action
> [Click here](https://xpfw.github.io/form) to see a live demo of this example field component

This is the code for the registered component.
```typescript
import * as React from 'react'
import { IFieldProps, ComponentRegistry } from '@xpfw/form-shared'
import { FieldType } from '@xpfw/validate';
class GuidedNumbersField extends React.Component<IFieldProps, any> {
  public randomize() {
    this.props.setValue(Math.round(Math.random() * 100))
  }
  public componentWillMount() {
    this.randomize()
  }
  public render() {
    return (
      <div className="is-flex centerJustify has-text-centered is-size-5 marginTop marginBottom">
        <a className="button" onClick={() => {
          this.props.setValue(this.props.value - 1)
        }}>Decrease</a>
        <span style={{marginRight: "1rem", marginLeft: "1rem"}}>Value of <i>{this.props.field.mapTo}</i> is: <b>{this.props.value}</b></span>
        <a className="button" onClick={() => {
          this.props.setValue(this.props.value + 1)
        }}>Increase</a><a style={{marginLeft: "1rem"}} className="button" onClick={() => {
          this.randomize()
        }}>Randomize</a>
      </div>
    )
  }
}
```
