import {  IField } from "@xpfw/validate"
import { get, isNil } from "lodash"
import * as React from "react"
import { SharedFormShow } from "@xpfw/ui-shared";
import { IFormShowProps } from '../../../../packages/xpfw-ui-shared/dist/components/show';

class RelationshipListItemW extends React.Component<{
    item: any
    field: IField
}, any> {
  public render() {
    let name = "loading"
    let id = "loading"
    const obj = this.props.item
    if (!isNil(obj)) {
      name = get(obj, get(this.props, "field.validate.relationshipNamePath", "id"), "NOTFOUND")
      id = get(obj, get(this.props, "field.validate.relationshipIdPath", "id"), "NOTFOUND")
    }
    return (
      <span>
        {name}
      </span>
    )
  }
}
const t1: any = RelationshipListItemW
const tmp: any = SharedFormShow<{}>(t1)
const RelationshipListItem: React.ComponentClass<IFormShowProps & {
  field: IField
}> = tmp
export default RelationshipListItem