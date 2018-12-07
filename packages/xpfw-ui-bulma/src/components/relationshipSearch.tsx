import { SharedField } from "@xpfw/form-shared"
import {
  IFormListProps, ISharedRelationshipField, ISharedRelationshipFieldProps,
  RelationShipWrapper, SharedFormList
} from "@xpfw/ui-shared"
import { getFieldsFromForm, IField } from "@xpfw/validate"
import { get, isNil } from "lodash"
import * as React from "react"
import WebRelationshipItem from "./relationshipItem"

class WebRelationshipSearchList extends React.Component<IFormListProps, any> {
  public render() {
    const nameObjs: any = []
    const addId = get(this.props, "addId")
    const removeId = get(this.props, "removeId")
    const field = get(this.props, "field")
    for (const child of get(this.props, "list.result", [])) {
      let name = "loading"
      let id
      if (!isNil(child)) {
        name = get(child, get(this.props, "field.validate.relationshipNamePath", "id"), "NOTFOUND")
        id = get(child, get(this.props, "field.validate.relationshipIdPath", "id"), "-1")
      }
      nameObjs.push(<WebRelationshipItem field={field} item={child} addId={addId} removeId={removeId} isAdd />)
    }
    return (
      <div>
        {nameObjs}
      </div>
    )
  }
}

const WrappedWebRelationshipSearchList: any = SharedFormList<{}>(WebRelationshipSearchList)

class WebRelationshipSearch extends React.Component<ISharedRelationshipFieldProps, any> {
  public render() {
    const field = get(this.props, "searchForm.sections[0].fields[0]")
    return (
      <div>
          <SharedField field={field} prefix={this.props.prefix} />
          <WrappedWebRelationshipSearchList
            field={this.props.field}
            prefix={this.props.prefix}
            form={this.props.searchForm}
            addId={this.props.addId}
            defaultEntries={this.props.lastUsed}
          />
      </div>
    )
  }
}

export default WebRelationshipSearch
