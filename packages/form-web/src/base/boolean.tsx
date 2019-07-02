import { getMapToFromProps, IFieldProps, useFieldWithValidation } from "@xpfw/form"
import { get } from "lodash"
import { observer } from "mobx-react-lite"
import * as React from "react"

const BooleanField: React.FunctionComponent<IFieldProps> = observer((props) => {
  const fieldHelper = useFieldWithValidation(props.schema, getMapToFromProps(props), props.prefix, {
    valueEventKey: "nativeEvent.target.checked"
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
