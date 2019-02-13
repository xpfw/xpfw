import { IFieldProps } from "@xpfw/form-shared"
import { get, isFunction } from "lodash"
import * as React from "react"
import { setFromEvent } from "./valueUtil"

class SelectField extends React.Component<IFieldProps, any> {
  private onChange: any
  constructor(props: any) {
    super(props)
    this.onChange = setFromEvent(this, "nativeEvent.target.value")
  }
  public render() {
    let selOpts = get(this.props, "field.selectOptions", [])
    if (isFunction(selOpts)) {
      selOpts = selOpts(this.props.value, this.props.field, this.props)
    }
    const options = selOpts.map((option: any) => {
      return (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      )
    })
    return (
      <select className={this.props.className} value={this.props.value} onChange={this.onChange}>
        {options}
      </select>
    )
  }
}

export default SelectField
