import * as React from 'react'
import { IFieldProps, ComponentRegistry } from '@xpfw/form-shared'
import { FieldType } from '@xpfw/validate';
class GuidedNumbersField extends React.Component<IFieldProps, any> {
  public randomize() {
    this.props.setValue(Math.round(Math.random() * 100))
  }
  public componentWillMount() {
    this.randomize()
  }
  public render() {
    return (
      <div className="is-flex centerJustify has-text-centered is-size-5 marginTop marginBottom">
        <a className="button" onClick={() => {
          this.props.setValue(this.props.value - 1)
        }}>Decrease</a>
        <span style={{marginRight: "1rem", marginLeft: "1rem"}}>Value of <i>{this.props.field.mapTo}</i> is: <b>{this.props.value}</b></span>
        <a className="button" onClick={() => {
          this.props.setValue(this.props.value + 1)
        }}>Increase</a><a style={{marginLeft: "1rem"}} className="button" onClick={() => {
          this.randomize()
        }}>Randomize</a>
      </div>
    )
  }
}
ComponentRegistry.registerComponent(FieldType.Number, GuidedNumbersField, "guided")