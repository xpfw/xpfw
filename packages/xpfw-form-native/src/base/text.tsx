import { IFieldProps } from "@xpfw/form-shared"
import { globals } from "@xpfw/validate"
import { get } from "lodash"
import * as React from "react"
import NativeFieldContainer from "./field"
declare const require: any
import { FormInput } from "react-native-elements"

class NativeTextField extends React.Component<IFieldProps, any> {
  public render() {
    const fieldType = get(this.props, "field.type")
    let secureTextEntry = false
    let keyboardType: any = "default"
    if (fieldType === globals.FieldType.Number) {
      keyboardType = "numeric"
    } else if (fieldType === globals.FieldType.Password) {
      secureTextEntry = true
    }
    return (
      <NativeFieldContainer {...this.props}>
        <FormInput
          {...this.props}
          secureTextEntry={secureTextEntry}
          value={this.props.value}
          keyboardType={keyboardType}
          onChangeText={this.props.setValue}
        />
      </NativeFieldContainer>
    )
  }
}

export default NativeTextField
