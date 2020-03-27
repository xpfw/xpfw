
import { IFieldProps, useFieldWithValidation } from "@xpfw/form"
import { get, map, isFunction } from "lodash"
import * as React from "react"
import { Picker } from "react-native"

const NativeSelectField = (props: IFieldProps) => {
  const fieldProps = useFieldWithValidation(props.schema, props.mapTo, props.prefix)
  let selOpts: any = get(props.schema, "selectOptions", [])
  if (isFunction(selOpts)) {
    selOpts = selOpts(fieldProps.value, props.schema, props)
  }
  const options = map(selOpts, (option: any) => {
    return (
      <Picker.Item key={option.value} value={option.value} label={option.label} />
    )
  })
  return (
    <Picker
      selectedValue={fieldProps.value}
      onValueChange={fieldProps.setValue}
    >
      {options}
    </Picker>
  )
}

export default NativeSelectField
