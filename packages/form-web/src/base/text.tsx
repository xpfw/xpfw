import { getMapToFromProps, IFieldProps, JSONSchemaDefinition, memo, useFieldWithValidation } from "@xpfw/form"
import { get } from "lodash"
import { observer } from "mobx-react-lite"
import * as momentA from "moment"
import * as React from "react"
import SelectComponent from "./select"

const moment: any = momentA
const getOriginalFormatFromType = (dateType?: string) => {
  let momentParseFrom = ""
  if (dateType === "date") {
    momentParseFrom = get(moment, "HTML5_FMT.DATE")
  } else if (dateType === "time") {
    momentParseFrom = get(moment, "HTML5_FMT.TIME")
  } else  {
    momentParseFrom = get(moment, "HTML5_FMT.DATETIME_LOCAL")
  }
  return momentParseFrom
}

const setDate = (setValue: any, schema: JSONSchemaDefinition, eventKey: string) => {
  return (e: any) => {
    const value = get(e, eventKey)
    setValue(moment(value, getOriginalFormatFromType(get(schema, "format"))).toISOString())
  }
}
const TextField: React.FunctionComponent<IFieldProps> = observer((props) => {
  switch (props.schema.format) {
    case "select": {
      return <SelectComponent {...props} />
    }
  }
  const format = get(props, "schema.format")
  const isDate = format === "date" || format === "date-time" || format === "time"
  const fieldHelper = useFieldWithValidation(props.schema, getMapToFromProps(props), props.prefix, {
    valueEventKey: "nativeEvent.target.value"
  })
  const fieldType = get(props, "schema.type")
  let value = fieldHelper.value
  console.log("VALUE IS", value)
  let type = "text"
  let min
  let max
  let step
  let onChange = fieldHelper.setValue
  if (fieldType === "number") {
    type = "number"
    min = get(props, "schema.minimum")
    max = get(props, "schema.maximum")
    step = get(props, "schema.step")
  }
  if (format === "slider") {
    type = "range"
  } else if (format === "password") {
    type = "password"
  } else if (isDate) {
    onChange = memo(() => setDate(fieldHelper.setValue, props.schema, "nativeEvent.target.value"),
      ["setDate", JSON.stringify(props.schema), props.mapTo, props.prefix])
    if (format === "date") {
      type = "date"
    } else if (format === "time") {
      type = "time"
    } else  {
      type = "datetime-local"
    }
    if (value == null) {
      value = moment(get(props, "schema.default")).format(getOriginalFormatFromType(format))
    } else {
      value = moment(value).format(getOriginalFormatFromType(format))
    }
  }
  return (
    <input
      type={type}
      id={get(props, "id")}
      className={get(props, "className")}
      value={value}
      step={step}
      min={min}
      max={max}
      onChange={onChange}
    />
  )
})

export default TextField
export {
  setDate
}
