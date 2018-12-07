import { FieldType } from "@xpfw/validate"
import * as React from "react"
import ComponentRegistry from "../componentRegistry"

const makeMockElement: any = (name: string) => {
  return class extends React.Component<any, any> {
    public render() {
      return (
        <div className={name}>
          {JSON.stringify(this.props, null, 2)}
        </div>
      )
    }
  }
}

const baseComponentMocks = () => {
  ComponentRegistry.registerComponent(FieldType.Text, makeMockElement("text"))
  ComponentRegistry.registerComponent(FieldType.Array, makeMockElement("array"))
  ComponentRegistry.registerComponent(FieldType.Boolean, makeMockElement("boolean"))
  ComponentRegistry.registerComponent(FieldType.Date, makeMockElement("date"))
  ComponentRegistry.registerComponent(FieldType.Number, makeMockElement("number"))
  ComponentRegistry.registerComponent(FieldType.Object, makeMockElement("object"))
  ComponentRegistry.registerComponent(FieldType.Select, makeMockElement("select"))
}

export default baseComponentMocks
export {
  makeMockElement
}
