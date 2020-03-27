import { ComponentRegistry } from "@xpfw/form"
import * as React from "react"

const makeMockElement: any = (name: string) => {
  return class extends React.Component<any, any> {
    public render() {
      return (
        <div className={name}>
          {JSON.stringify(this.props)}
        </div>
      )
    }
  }
}

const baseComponentMocks = () => {
  ComponentRegistry.registerComponent("string", makeMockElement("text"))
  ComponentRegistry.registerComponent("array", makeMockElement("array"))
  ComponentRegistry.registerComponent("boolean", makeMockElement("boolean"))
  ComponentRegistry.registerComponent("date", makeMockElement("date"))
  ComponentRegistry.registerComponent("number", makeMockElement("number"))
  ComponentRegistry.registerComponent("object", makeMockElement("object"))
  ComponentRegistry.registerComponent("select", makeMockElement("select"))
}

export default baseComponentMocks
export {
  makeMockElement
}
