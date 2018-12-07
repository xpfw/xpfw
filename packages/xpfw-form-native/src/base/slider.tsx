
import { IFieldProps } from "@xpfw/form-shared"
import { globals } from "@xpfw/validate"
import NativeFieldContainer from "./field"
import { get } from "lodash"
import * as React from "react"
declare const require: any
import { Slider, Text } from "react-native-elements"

export default class NativeSliderField extends React.Component<IFieldProps, any> {
  public render() {
    const fieldType = get(this.props, "field.type")
    let secureTextEntry = false
    let keyboardType: any = "default"
    if (fieldType === globals.FieldType.Number) {
      keyboardType = "numeric"
    } else if (fieldType === globals.FieldType.Password) {
      secureTextEntry = true
    }
    let min
    let max
    let step
    if (fieldType === globals.FieldType.Number || fieldType === globals.FieldType.Slider) {
      min = get(this.props.field, "validate.min")
      max = get(this.props.field, "validate.max")
      step = get(this.props.field, "validate.step")
    }
    return (
      <NativeFieldContainer {...this.props} showVal>
        <Slider
          {...this.props}
          value={this.props.value}
          onValueChange={this.props.setValue}
          step={step}
          minimumValue={min}
          maximumValue={max}
        />
      </NativeFieldContainer>
    )
  }
}
