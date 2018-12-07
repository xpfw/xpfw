import {
  ISharedRelationshipField, ISharedRelationshipFieldProps, RelationShipWrapper
} from "@xpfw/ui-shared"
import { get } from "lodash"
import * as React from "react"
import { View } from "react-native"
import { Button } from "react-native-elements"
import NativeFieldContainer from "./field"
import NativeRelationshipItem from "./relationshipItem"
import NativeRelationshipSearch from "./relationshipSearch"

class NativeRelationshipMulti extends React.Component<ISharedRelationshipFieldProps & {
  buttonProps?: any
}, any> {
  public render() {
    let content
    const gotVal = Array.isArray(this.props.value) && this.props.value.length > 0
    if (!gotVal || this.props.displayMode === 1) {
      content = (
          <NativeRelationshipSearch {...this.props} prefix={get(this.props, "field.mapTo")} />
      )
    } else {
      const name = "loading"
      const obj = this.props.relatedObject
      const relationItems = []
      for (const child of this.props.relatedObject) {
        relationItems.push(
          <NativeRelationshipItem
            key={get(this.props, "field.mapTo")}
            field={this.props.field}
            item={child}
            addId={this.props.addId}
            removeId={this.props.removeId}
            isAdd={false}
          />)
      }
      content = (
        <View>
          <Button
            title="Search"
            {...this.props.buttonProps}
            onPress={this.props.setDisplayMode.bind(this, 1)}
            icon={{name: "search"}}
          />
          {relationItems}
        </View>
      )
    }
    return (
      <NativeFieldContainer>
        {content}
      </NativeFieldContainer>
    )
  }
}

export {
  ISharedRelationshipField, ISharedRelationshipFieldProps
}
export default RelationShipWrapper(NativeRelationshipMulti)
