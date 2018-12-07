import { IArrayProps, IFieldProps, SharedArray, SharedField } from "@xpfw/form-shared"
import { IField } from "@xpfw/validate"
import { cloneDeep, get, map } from "lodash"
import * as React from "react"
import { View } from "react-native"
import { Button } from "react-native-elements"

class NativeArrayField extends React.Component<IArrayProps, any> {
  public render() {
    return (
      <View>
        {map(this.props.subFields, (field: any, index: any) => {
          return (
          <View style={{flex: 1, flexDirection: "row", alignItems: "center"}}>
            <SharedField field={field} prefix={this.props.prefix} />
            <Button
              onPress={this.props.removeItem(index)}
              title="Delete"
            />
          </View>
        )})}
        <View style={{marginTop: 5}}>
          <Button
            onPress={this.props.increaseSize}
            title="Add"
          />
        </View>
      </View>
    )
  }
}

export default SharedArray(NativeArrayField)
