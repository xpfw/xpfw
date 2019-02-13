import { IFieldProps, JSONSchemaDefinition, useFieldWithValidation } from "@xpfw/form"
import { get } from "lodash"
import * as momentA from "moment"
import * as React from "react"
import { setFromEvent } from "./valueUtil"

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
    setValue(moment(value, getOriginalFormatFromType(get(schema, "format"))).toDate())
  }
}
const TextField: React.FunctionComponent<IFieldProps> = (props) => {
  const fieldHelper = useFieldWithValidation(props.mapTo, props.schema, props.prefix)
  const fieldType = get(props, "schema.type")
  const format = get(props, "schema.format")
  let value = fieldHelper.value
  let type = "text"
  let min
  let max
  let step
  let onChange = setFromEvent(fieldHelper.setValue, "nativeEvent.target.value")
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
  } else if (format === "date" || format === "date-time" || format === "time") {
    onChange = setDate(fieldHelper.setValue, props.schema, "nativeEvent.target.value")
    if (format === "date") {
      type = "date"
    } else if (format === "time") {
      type = "time"
    } else  {
      type = "datetime-local"
    }
    value = moment(value).format(getOriginalFormatFromType(format))
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
}

export default TextField
export {
  setDate
}
