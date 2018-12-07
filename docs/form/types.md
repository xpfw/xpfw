# Custom Types

**xpfw** is made to be flexible. Need to validate a type more complex than one of the base ones? Simply write your own!

To do that first [register a validator](/core/types.md) for said type.
After that you can register a themed component for the `default`-theme of your new type.

```typescript
import * as React from 'react'
import { IFieldProps, ComponentRegistry } from '@xpfw/form-shared'

class OnlyDividableByThree extends React.Component<IFieldProps, any> {
  public render() {
    return (
      <div className="is-flex centerJustify has-text-centered is-size-5 marginTop marginBottom">
        <a className="button" onClick={() => {
          this.props.setValue(3)
        }}>Fix Value</a>
        <span style={{marginRight: "1rem", marginLeft: "1rem"}}>Value of <i>{this.props.field.mapTo}</i> is: <b>{this.props.value}</b></span>
        <a className="button" onClick={() => {
          this.props.setValue(this.props.value + 1)
        }}>Break Value</a><a style={{marginLeft: "1rem"}} className="button" onClick={() => {
          this.props.setValue(2)
        }}>Randomize</a>
      </div>
    )
  }
}

ComponentRegistry.registerComponent("mustBe-1", "default", OnlyDividableByThree)
```