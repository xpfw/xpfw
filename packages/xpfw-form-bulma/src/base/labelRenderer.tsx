import * as React from "react"

export interface ILabelComponent {
  text: string
}

class Label extends React.Component<ILabelComponent, any> {
  public render() {
    return (
      <label className="label">{this.props.text}</label>
    )
  }
}

const holder: {label: React.ComponentType<ILabelComponent>} = {
  label: Label
}

export default holder
