import { globals } from "@xpfw/validate"
import * as React from "react"

const makeMockElement = (name: string) => {
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
export default makeMockElement
