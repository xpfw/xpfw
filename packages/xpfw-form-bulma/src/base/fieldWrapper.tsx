import { globals } from "@xpfw/validate"
import { get } from "lodash"
import * as React from "react"
import holder from "./labelRenderer"

class FieldContainer extends React.Component<any, any> {
  public render() {
    const err = this.props.error && this.props.error.ok !== true ?
     <p className="help is-danger">{JSON.stringify(this.props.error)}</p> : null
    const isSlider = get(this.props, "field.type") === globals.FieldType.Slider
    const labelText = `${get(this.props, "field.mapTo")}${isSlider && this.props.value ? `: ${this.props.value}` : ``}`
    const Label = holder.label
    return (
      <div className="field">
        <Label text={labelText} />
        {this.props.children}
        {err}
      </div>
    )
  }
}

export default FieldContainer
