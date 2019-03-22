import { getMapToFromProps, IFieldProps, useFieldWithValidation } from "@xpfw/form"
import { get } from "lodash"
import { observer } from "mobx-react-lite"
import * as React from "react"

const BooleanField: React.FunctionComponent<IFieldProps> = observer((props) => {
  console.log("TRYING TO RENDER BOOLEANFIELD IN form-webv")
  const fieldHelper = useFieldWithValidation(props.schema, getMapToFromProps(props), props.prefix, {
    valueEventKey: "nativeEvent.target.value"
  })
  return (
    <input
      type="checkbox"
      id={get(props, "id")}
      className={get(props, "className")}
      checked={fieldHelper.value}
      onChange={fieldHelper.setValue}
    />
  )
})

export default BooleanField
