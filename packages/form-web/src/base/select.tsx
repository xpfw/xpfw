import { getMapToFromProps, IFieldProps, useFieldWithValidation } from "@xpfw/form"
import { get, isFunction } from "lodash"
import { observer } from "mobx-react-lite"
import * as React from "react"

const SelectField: React.FunctionComponent<IFieldProps> = observer((props) => {
  const fieldHelper = useFieldWithValidation(props.schema, getMapToFromProps(props), props.prefix, {
    valueEventKey: "nativeEvent.target.value"
  })
  let selOpts = get(props, "schema.selectOptions", [])
  if (isFunction(selOpts)) {
    selOpts = selOpts(fieldHelper.value, props.schema, props)
  }
  const options = selOpts.map((option: any) => {
    return (
      <option key={option.value} value={option.value}>
        {option.label}
      </option>
    )
  })
  return (
    <select
      className={get(props, "className")}
      value={fieldHelper.value}
      onChange={fieldHelper.setValue}
    >
      {options}
    </select>
  )
})

export default SelectField
