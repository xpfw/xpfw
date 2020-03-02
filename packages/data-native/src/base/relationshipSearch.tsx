import { SharedField, prependPrefix } from "@xpfw/form"
import {
   useList, IRelationshipHookProps
} from "@xpfw/data"
import { get } from "lodash"
import * as React from "react"
import { View } from "react-native"
import NativeRelationshipItem from "./relationshipItem"
import { observer } from "mobx-react"

const NativeRelationshipSearch: React.FunctionComponent<any> = observer((props) => {
  const searchField = get(props, `searchForm.properties[${get(props, "schema.relationship.namePath")}]`)
  const nameObjs: any = []
  const addId = get(props, "addId")
  const removeId = get(props, "removeId")
  const field = get(props, "schema")
  const relList = useList(props.searchForm, undefined, prependPrefix(props.prefix, "search"))
  for (const child of get(relList, "list.data", [])) {
    nameObjs.push(<NativeRelationshipItem schema={field} item={child} addId={addId} removeId={removeId} isAdd />)
  }
  return (
    <View>
      <SharedField schema={searchField} prefix={prependPrefix(props.searchForm.title, prependPrefix(props.prefix, "search"))} />
      {nameObjs}
    </View>
  )
})

export default NativeRelationshipSearch
