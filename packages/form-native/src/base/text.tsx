import { IFieldProps, useFieldWithValidation, getLabelFromProps } from "@xpfw/form"
import { get, isString } from "lodash"
import * as React from "react"
import NativeFieldContainer from "./field"
import { Input } from "react-native-elements"
import { observer } from "mobx-react"

const NativeTextField = observer((props: IFieldProps) => {
  let valueProps = useFieldWithValidation(props.schema, props.mapTo, props.prefix)
  const format = get(props, "schema.format")
  const fieldType = get(props, "schema.type")
  let secureTextEntry = false
  let keyboardType: any = "default"
  if (fieldType === "number") {
    keyboardType = "numeric"
  } else if (format === "password") {
    secureTextEntry = true
  }
  let valueToUse = valueProps.value
  if (valueToUse != null && !isString(valueToUse)) {
    valueToUse = String(valueToUse)
  }
  return (
    <Input
      {...props}
      label={getLabelFromProps(props)}
      secureTextEntry={secureTextEntry}
      value={valueToUse}
      keyboardType={keyboardType}
      onChangeText={valueProps.setValue}
    />
  )
})


export default NativeTextField
