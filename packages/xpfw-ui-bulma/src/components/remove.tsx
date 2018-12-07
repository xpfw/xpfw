import { SharedField } from "@xpfw/form-shared"
import { IFormRemoveProps, ISharedFormRemove, SharedFormRemove } from "@xpfw/ui-shared"
import {  IField } from "@xpfw/validate"
import { get } from "lodash"
import * as React from "react"

class BulmaRemoveWrapped extends React.Component<IFormRemoveProps, any> {
  public render() {
    const result = get(this.props, "state.result", false)
    return (
      <div>
        {result ? (
          <a className="button is-success">Deleted</a>
        ) : (this.props.loading ? (
          <a className="button is-info">Loading...</a>
        ) : (
          <a className="button is-warning" onClick={this.props.submitRemove}>Delete</a>
        ))}
      </div>
    )
  }
}

const BulmaRemove: React.ComponentType<ISharedFormRemove> = SharedFormRemove<{}>(BulmaRemoveWrapped)
export default BulmaRemove
export {
  IFormRemoveProps
}
