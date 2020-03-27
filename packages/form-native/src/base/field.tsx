import { get } from "lodash"
import * as React from "react"
import { View, Text } from "react-native"
import { getLabelFromProps, IFieldProps } from "@xpfw/form"

const NativeFieldContainer: React.FunctionComponent<IFieldProps & any> = (props) => {
  const err = props.error && props.error.ok !== true ?  (
    <Text>{JSON.stringify(props.error)}</Text>
  ) : <View />
  let label = getLabelFromProps(props)
  if (props.showVal) {
    label += `: ${props.value}`
  }
  return (
    <View>
      <Text>{label}</Text>
      {props.children}
      {err}
    </View>
  )
}

export default NativeFieldContainer
