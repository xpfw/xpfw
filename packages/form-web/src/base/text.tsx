import {
  ExtendedJSONSchema, getMapToFromProps, IFieldProps,
  JSONSchemaDefinition, memo, useFieldWithValidation
} from "@xpfw/form"
import { IFieldOptions } from "@xpfw/form/dist/hooks/field"
import { get } from "lodash"
import { observer } from "mobx-react"
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
const setNumber = (setValue: any, schema: JSONSchemaDefinition, eventKey: string) => {
  return (e: any) => {
    const value = get(e, eventKey)
    setValue(Number(value))
  }
}
const useTextField = (schema: ExtendedJSONSchema, mapTo?: string, prefix?: string, options?: IFieldOptions) => {
  const format = get(schema, "format")
  const isDate = format === "date" || format === "date-time" || format === "time"
  const fieldHelper = useFieldWithValidation(schema, mapTo, prefix, {
    valueEventKey: "nativeEvent.target.value"
  })
  const fieldType = get(schema, "type")
  let value = fieldHelper.value
  let type = "text"
  let min
  let max
  let step
  let onChange = fieldHelper.setValue
  if (fieldType === "number") {
    type = "number"
    min = get(schema, "minimum")
    max = get(schema, "maximum")
    step = get(schema, "step")
    onChange = memo(() => setNumber(fieldHelper.setValue, schema, "nativeEvent.target.value"),
      ["setNumber", JSON.stringify(schema), mapTo, prefix])
  }
  if (format === "slider") {
    type = "range"
  } else if (format === "password") {
    type = "password"
  } else if (isDate) {
    onChange = memo(() => setDate(fieldHelper.setValue, schema, "nativeEvent.target.value"),
      ["setDate", JSON.stringify(schema), mapTo, prefix])
    if (format === "date") {
      type = "date"
    } else if (format === "time") {
      type = "time"
    } else  {
      type = "datetime-local"
    }
    if (value == null) {
      value = moment(get(schema, ".default")).format(getOriginalFormatFromType(format))
    } else {
      value = moment(value).format(getOriginalFormatFromType(format))
    }
  }
  return {
    ...fieldHelper,
    value, onChange, min, max, step, type
  }
}

const TextField: React.FunctionComponent<IFieldProps & {
  className?: string
  placeholder?: string
}> = observer((props) => {
  switch (props.schema.format) {
    case "select": {
      return <SelectComponent {...props} />
    }
  }
  const fieldHelper = useTextField(props.schema, getMapToFromProps(props), props.prefix, {
    valueEventKey: "nativeEvent.target.value"
  })
  return (
    <input
      type={fieldHelper.type}
      id={get(props, "id")}
      className={get(props, "className")}
      value={fieldHelper.value}
      step={fieldHelper.step}
      min={fieldHelper.min}
      max={fieldHelper.max}
      onChange={fieldHelper.onChange}
      placeholder={props.placeholder}
    />
  )
})

export default TextField
export {
  setDate, useTextField
}
