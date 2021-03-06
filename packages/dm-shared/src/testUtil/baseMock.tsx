import * as React from "react"

const makeMockElement = (name: string, stingifier?: Function) => {
  return class extends React.Component<any, any> {
    public render() {
      return (
        <div className={name}>
          {JSON.stringify(stingifier ? stingifier(this.props) : this.props, undefined, 2)}
        </div>
      )
    }
  }
}
export default makeMockElement
