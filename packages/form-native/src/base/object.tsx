import { IFieldProps, SharedField, useObject } from "@xpfw/form"
import { each } from "lodash"
import * as React from "react"
import { View } from "react-native"

const ObjectField = (props: IFieldProps) => {
  const children: any = []
  const objProps = useObject(props.schema, props.mapTo, props.prefix)
  if (Array.isArray(objProps.fields)) {
    each(objProps.fields, (subField) => {
      children.push(<SharedField {...subField} key={subField.mapTo} />)
    })
  }
  return (
    <View>
      {children}
    </View>
  )
}

export default ObjectField
