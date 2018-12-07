
import { IFieldProps } from "@xpfw/form-shared"
import { globals } from "@xpfw/validate"
import { get } from "lodash"
import * as React from "react"
import { Switch } from "react-native"
declare const require: any

export default class NativeBooleanField extends React.Component<IFieldProps, any> {
  public render() {
    const gotErr = get(this.props, "error.errors.length", 0) > 0
    const fieldType = get(this.props, "field.type")
    return (
      <Switch
        value={this.props.value}
        onValueChange={this.props.setValue}
      />
    )
  }
}
