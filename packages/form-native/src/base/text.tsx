import { IFieldProps, useFieldWithValidation } from "@xpfw/form"
import { get } from "lodash"
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
  return (
    <NativeFieldContainer {...props}>
      <Input
        {...props}
        secureTextEntry={secureTextEntry}
        value={valueProps.value}
        keyboardType={keyboardType}
        onChangeText={valueProps.setValue}
      />
    </NativeFieldContainer>
  )
})


export default NativeTextField
