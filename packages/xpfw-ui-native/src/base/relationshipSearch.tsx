import { SharedField } from "@xpfw/form-shared"
import {
   IFormListProps, ISharedRelationshipFieldProps, SharedFormList
} from "@xpfw/ui-shared"
import { get } from "lodash"
import * as React from "react"
import { View } from "react-native"
import NativeRelationshipItem from "./relationshipItem"

class NativeRelationshipSearchList extends React.Component<IFormListProps, any> {
  public render() {
    const nameObjs: any = []
    const addId = get(this.props, "addId")
    const removeId = get(this.props, "removeId")
    const field = get(this.props, "field")
    for (const child of get(this.props, "list.result", [])) {
      nameObjs.push(
        <NativeRelationshipItem key={field.mapTo} field={field} item={child} addId={addId} removeId={removeId} isAdd />
      )
    }
    return (
      <View>
        {nameObjs}
      </View>
    )
  }
}

const WrappedNativeRelationshipSearchList: any = SharedFormList(NativeRelationshipSearchList)

class NativeRelationshipSearch extends React.Component<ISharedRelationshipFieldProps, any> {
  public render() {
    const searchForm = this.props.searchForm
    const field = get(this.props, "searchForm.sections[0].fields[0]")
    return (
      <View>
        <SharedField field={field} prefix={this.props.prefix} />
        <WrappedNativeRelationshipSearchList
          field={this.props.field}
          prefix={this.props.prefix}
          form={searchForm}
          addId={this.props.addId}
          defaultEntries={this.props.lastUsed}
        />
      </View>
    )
  }
}

export default NativeRelationshipSearch
