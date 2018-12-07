import { IFieldProps } from "@xpfw/form-shared"
import * as React from "react"
import { setFromEvent } from "./valueUtil"

class BooleanField extends React.Component<IFieldProps, any> {
  private onChange: any
  constructor(props: any) {
    super(props)
    this.onChange = setFromEvent(this, "nativeEvent.target.checked")
  }
  public render() {
    return (
      <input
        type="checkbox"
        checked={this.props.value}
        onChange={this.onChange}
      />
    )
  }
}

export default BooleanField
