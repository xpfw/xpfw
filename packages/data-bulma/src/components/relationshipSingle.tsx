import { ISharedRelationshipField, ISharedRelationshipFieldProps, RelationShipWrapper } from "@xpfw/ui-shared"
import { get, isNil } from "lodash"
import * as React from "react"
import WebRelationshipItem from "./relationshipItem"
import WebRelationshipSearch from "./relationshipSearch"

class WebRelationshipSingle extends React.Component<ISharedRelationshipFieldProps, any> {
  public render() {
    let content: any
    if (!isNil(this.props.value)) {
      const obj = this.props.relatedObject
      content = (
        <WebRelationshipItem field={this.props.field} item={obj} addId={this.props.addId} removeId={this.props.removeId} isAdd={false} />
      )
    } else {
      content = (
        <div>
          <WebRelationshipSearch
            {...this.props}
            prefix={get(this.props, "field.mapTo")}
          />
        </div>
      )
    }
    return (
      <div className="field">
        <label className="label">Relationship {get(this.props, "field.mapTo", "RelationshipField")}</label>
        <div className="control">
          {content}
        </div>
      </div>
    )
  }
}

const WrappedWebRelationshipSingle: React.ComponentType<ISharedRelationshipField> =
RelationShipWrapper<{}>(WebRelationshipSingle)
export default WrappedWebRelationshipSingle
export {
  ISharedRelationshipField, ISharedRelationshipFieldProps
}
