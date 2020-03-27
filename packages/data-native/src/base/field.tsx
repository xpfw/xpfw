import { get } from "lodash"
import * as React from "react"
import { Text, View } from "react-native"

class NativeFieldContainer extends React.Component<any, any> {
  public render() {
    const err = this.props.error && this.props.error.ok !== true ?  (
      <Text>{JSON.stringify(this.props.error)}</Text>
    ) : <View />
    let label = get(this.props, "field.mapTo")
    if (this.props.showVal) {
      label += `: ${this.props.value}`
    }
    return (
      <View>
        <Text>{label}</Text>
        {this.props.children}
        {err}
      </View>
    )
  }
}

export default NativeFieldContainer
