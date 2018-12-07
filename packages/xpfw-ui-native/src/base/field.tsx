import { get } from "lodash"
import * as React from "react"
import { View } from "react-native"
import { FormLabel, FormValidationMessage } from "react-native-elements"

class NativeFieldContainer extends React.Component<any, any> {
  public render() {
    const err = this.props.error && this.props.error.ok !== true ?  (
      <FormValidationMessage>{JSON.stringify(this.props.error)}</FormValidationMessage>
    ) : <View />
    let label = get(this.props, "field.mapTo")
    if (this.props.showVal) {
      label += `: ${this.props.value}`
    }
    return (
      <View>
        <FormLabel>{label}</FormLabel>
        {this.props.children}
        {err}
      </View>
    )
  }
}

export default NativeFieldContainer
