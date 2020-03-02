import * as React from "react"
import { Switch } from "react-native"
import { useFieldWithValidation, IFieldProps } from "@xpfw/form"
import { observer } from "mobx-react"

const NativeBooleanField = observer((props: IFieldProps) => {
  const fieldProps = useFieldWithValidation(props.schema, props.mapTo, props.prefix)
  return (
    <Switch
      value={fieldProps.value}
      onValueChange={fieldProps.setValue}
    />
  )

})

export default NativeBooleanField
