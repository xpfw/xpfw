import { ExtendedJSONSchema } from "@xpfw/form";
import { get, isNil } from "lodash"
import * as React from "react"

class WebRelationshipItem extends React.Component<{
    item: any
    schema: ExtendedJSONSchema
    removeId: any
    addId: any
    isAdd: boolean
}, any> {
  public render() {
    let name = "loading"
    let id
    const obj = this.props.item
    if (!isNil(obj)) {
      name = get(obj, get(this.props, "schema.relationship.namePath", "id"), "NOTFOUND")
      id = get(obj, get(this.props, "schema.relationship.idPath", "id"), "NOTFOUND")
    }
    const actionBtn = this.props.isAdd ? (
      <a className="button" onClick={this.props.addId.bind(this, id)}>
        Add
      </a>
    ) : (
      <a className="button" onClick={this.props.removeId.bind(this, id)}>
        Remove
      </a>
    )
    return (
    <div className="card" style={{marginTop: "1rem", marginBottom: "1rem"}}>
      <header style={{margin: "0.4rem"}}>
        <div className="columns">
          <div className="column is-two-thirds has-text-justified">
            <span className="is-size-6 has-text-weight-bold">
              {name}
            </span>
          </div>
          <div className="column is-one-third">
          <div className="is-pulled-right">
            {actionBtn}
          </div>
          <div className="is-clearfix" />
          </div>
        </div>
      </header>
    </div>
    )
  }
}
export default WebRelationshipItem
