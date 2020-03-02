import { useArray, IFieldProps, SharedField } from "@xpfw/form"
import { map } from "lodash"
import * as React from "react"
import { View } from "react-native"
import { Button } from "react-native-elements"

const NativeArrayField = (props: IFieldProps) => {
  let arrayProps = useArray(props.schema, props.mapTo, props.prefix)
  return (
    <View>
      {map(arrayProps.fields, (field, index: any) => {
        if (field == null) {
          return <View />
        }
        return (
        <View style={{flex: 1, flexDirection: "row", alignItems: "center"}}>
          <SharedField key={field.mapTo} schema={field.schema} mapTo={field.mapTo} prefix={field.prefix} />
          <Button
            onPress={arrayProps.decreaseSize}
            title="Delete"
          />
        </View>
      )})}
      <View style={{marginTop: 5}}>
        <Button
          onPress={arrayProps.increaseSize}
          title="Add"
        />
      </View>
    </View>
  )
}

export default NativeArrayField
