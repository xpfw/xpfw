import { getMapToFromProps, IFieldProps, useFieldWithValidation } from "@xpfw/form"
import { get } from "lodash"
import * as React from "react"
import { setFromEvent } from "./valueUtil"

const BooleanField: React.FunctionComponent<IFieldProps> = (props) => {
  const fieldHelper = useFieldWithValidation(props.schema, getMapToFromProps(props), props.prefix)
  return (
    <input
      type="checkbox"
      id={get(props, "id")}
      className={get(props, "className")}
      checked={fieldHelper.value}
      onChange={setFromEvent(fieldHelper.setValue, "nativeEvent.target.value")}
    />
  )
}

export default BooleanField
