import { useList } from "@xpfw/data"
import { SharedField } from "@xpfw/form"
import { get } from "lodash"
import { observer } from "mobx-react-lite"
import * as React from "react"
import WebRelationshipItem from "./relationshipItem"

const WebRelationshipSearch: React.FunctionComponent<any> = observer((props) => {
  const searchField = get(props, `searchForm.properties[${get(props, "schema.relationship.namePath")}]`)
  const nameObjs: any = []
  const addId = get(props, "addId")
  const removeId = get(props, "removeId")
  const field = get(props, "schema")
  const relList = useList(props.searchForm, undefined, props.prefix)
  for (const child of get(relList, "list.data", [])) {
    nameObjs.push(<WebRelationshipItem schema={field} item={child} addId={addId} removeId={removeId} isAdd />)
  }
  return (
    <div>
      <SharedField schema={searchField} prefix={props.prefix} />
      {nameObjs}
    </div>
  )
})

export default WebRelationshipSearch
