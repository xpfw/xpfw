import { SharedField } from "@xpfw/form-shared"
import { ISharedRelationshipField, ISharedRelationshipFieldProps, RelationShipWrapper } from "@xpfw/ui-shared"
import { getFieldsFromForm, IField } from "@xpfw/validate"
import { get, isNil } from "lodash"
import * as React from "react"
import WebRelationshipItem from "./relationshipItem"
import WebRelationshipSearch from "./relationshipSearch"

class WebRelationshipMulti extends React.Component<ISharedRelationshipFieldProps, any> {
  public render() {
    let content
    const gotVal = Array.isArray(this.props.value) && this.props.value.length > 0
    if (!gotVal || this.props.displayMode === 1) {
      content = (
        <div>
          <WebRelationshipSearch {...this.props} prefix={get(this.props, "field.mapTo")} />
        </div>
      )
    } else {
      const name = "loading"
      const obj = this.props.relatedObject
      const relationItems = []
      for (const child of this.props.relatedObject) {
        relationItems.push(<WebRelationshipItem field={this.props.field} item={child} addId={this.props.addId} removeId={this.props.removeId} isAdd={false} />)
      }
      content = (
        <div>
          <a className="button" onClick={this.props.setDisplayMode.bind(this, 1)}>Search</a>
          {relationItems}
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

const WrappedWebRelationshipMulti: React.ComponentType<ISharedRelationshipField> =
RelationShipWrapper<{}>(WebRelationshipMulti)

export default WrappedWebRelationshipMulti
export {
  ISharedRelationshipField, ISharedRelationshipFieldProps
}
