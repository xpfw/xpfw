import { IField } from "@xpfw/validate"
import {  get, isNil } from "lodash"
import * as React from "react"
import { Button, Card } from "react-native-elements"

class NativeRelationshipItem extends React.Component<{
  item: any
  field: IField
  removeId: any
  addId: any
  isAdd: boolean
  successBg?: any
  errBg?: any
}, any> {
  public render() {
    let name = "loading"
    let id
    const obj = this.props.item
    if (!isNil(obj)) {
      name = get(obj, get(this.props, "field.validate.relationshipNamePath", "id"), "NOTFOUND")
      id = get(obj, get(this.props, "field.validate.relationshipIdPath", "id"), "NOTFOUND")
    }
    const actionBtn = this.props.isAdd ? (
      <Button
        title={`Add ${name}`}
        buttonStyle={this.props.successBg}
        onPress={this.props.addId.bind(this, id)}
        icon={{name: "add"}}
      />
    ) : (
      <Button
        title={`Remove ${name}`}
        buttonStyle={this.props.errBg}
        onPress={this.props.removeId.bind(this, id)}
        icon={{name: "remove"}}
      />
    )
    return actionBtn
  }
}

export default NativeRelationshipItem
