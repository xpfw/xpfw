import { ExtendedJSONSchema, getMapTo, getMapToFromProps, IFieldProps, useField } from "@xpfw/form"
import { get, isFunction } from "lodash"
import { observer } from "mobx-react"
import * as React from "react"

const useSelect = (schema: ExtendedJSONSchema, mapTo?: string, prefix?: string, options?: any, props?: any) => {
  const fieldHelper = useField(getMapTo(schema, mapTo), prefix, options)
  let selOpts: any = get(schema, "selectOptions", [])
  if (isFunction(selOpts)) {
    selOpts = selOpts(fieldHelper.value, schema, props)
  }
  return {
    ...fieldHelper, selOpts
  }
}

const SelectField: React.FunctionComponent<IFieldProps> = observer((props) => {
  const selHelper = useSelect(props.schema, getMapToFromProps(props), props.prefix, {
    valueEventKey: "nativeEvent.target.value"
  })
  const options = selHelper.selOpts.map((option: any) => {
    return (
      <option key={option.value} value={option.value}>
        {option.label}
      </option>
    )
  })
  return (
    <select
      className={get(props, "className")}
      value={selHelper.value}
      onChange={selHelper.setValue}
    >
      {options}
    </select>
  )
})

export default SelectField
export {
  useSelect
}
