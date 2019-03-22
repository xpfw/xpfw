import * as React from "react"

export interface ILabelComponent {
  text: string
}

const Label: React.FunctionComponent<ILabelComponent> = (props) => {
  return (
    <label className="label">{props.text}</label>
  )
}

const holder: {label: React.ComponentType<ILabelComponent>} = {
  label: Label
}

export default holder
