import { IFieldProps } from "@xpfw/form-shared"
import { globals, IField } from "@xpfw/validate"
import { get } from "lodash"
import * as momentA from "moment"
import * as React from "react"
import { setFromEvent } from "./valueUtil"

const moment: any = momentA
const getOriginalFormatFromType = (dateType: number) => {
  let momentParseFrom = ""
  if (dateType === 3) {
    momentParseFrom = get(moment, "HTML5_FMT.DATE")
  } else if (dateType === 4) {
    momentParseFrom = get(moment, "HTML5_FMT.TIME")
  } else  {
    momentParseFrom = get(moment, "HTML5_FMT.DATETIME_LOCAL")
  }
  return momentParseFrom
}

const setDate = (thisRef: {props: {field: IField, setValue: any}}, eventKey: string) => {
  return (e: any) => {
    const value = get(e, eventKey)
    const dateType = get(thisRef.props, "field.validate.type")
    thisRef.props.setValue(moment(value, getOriginalFormatFromType(dateType)).toDate())
  }
}

class TextField extends React.Component<IFieldProps, any> {
  private onChange: any
  private onChangeDate: any
  constructor(props: IFieldProps) {
    super(props)
    this.onChange = setFromEvent(this, "nativeEvent.target.value")
    this.onChangeDate = setDate(this, "nativeEvent.target.value")
  }
  public render() {
    const gotErr = get(this.props, "error.errors.length", 0) > 0
    const fieldType = get(this.props, "field.type")
    let value = this.props.value
    let type = "text"
    let min
    let max
    let step
    let onChange = this.onChange
    if (fieldType === globals.FieldType.Number || fieldType === globals.FieldType.Slider) {
      type = "number"
      min = get(this.props.field, "validate.min")
      max = get(this.props.field, "validate.max")
      step = get(this.props.field, "validate.step")
    }
    if (fieldType === globals.FieldType.Number) {
      type = "number"
    } else if (fieldType === globals.FieldType.Slider) {
      type = "range"
    } else if (fieldType === globals.FieldType.Password) {
      type = "password"
    } else if (fieldType === globals.FieldType.Date) {
      onChange = this.onChangeDate
      const dateType = get(this.props, "field.validate.type")
      if (dateType === 3) {
        type = "date"
      } else if (dateType === 4) {
        type = "time"
      } else  {
        type = "datetime-local"
      }
      value = moment(value).format(getOriginalFormatFromType(dateType))
    }
    return (
      <input
        type={type}
        id={get(this.props, "id")}
        className={this.props.className}
        value={value}
        step={step}
        min={min}
        max={max}
        onChange={onChange}
      />
    )
  }
}

export default TextField
export {
  setDate
}
