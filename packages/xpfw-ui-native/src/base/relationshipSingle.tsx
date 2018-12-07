
import {
  ISharedRelationshipField, ISharedRelationshipFieldProps, RelationShipWrapper
} from "@xpfw/ui-shared"
import { get, isNil } from "lodash"
import * as React from "react"
import NativeFieldContainer from "./field"
import NativeRelationshipItem from "./relationshipItem"
import NativeRelationshipSearch from "./relationshipSearch"

class NativeRelationshipSingleField extends React.Component<ISharedRelationshipFieldProps, any> {
  public render() {
    let content
    if (!isNil(this.props.value)) {
      const obj = this.props.relatedObject
      content = (
        <NativeRelationshipItem
          field={this.props.field}
          item={obj}
          addId={this.props.addId}
          removeId={this.props.removeId}
          isAdd={false}
        />
      )
    } else {
      content = (
        <NativeRelationshipSearch {...this.props} prefix={get(this.props, "field.mapTo")} />
      )
    }
    return (
      <NativeFieldContainer {...this.props}>
        {content}
      </NativeFieldContainer>
    )
  }
}

export {
  ISharedRelationshipField, ISharedRelationshipFieldProps
}

export default RelationShipWrapper(NativeRelationshipSingleField)
