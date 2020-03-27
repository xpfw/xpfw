
import {
  useRelationshipWithProps, IRelationshipHookProps
} from "@xpfw/data"
import { isNil } from "lodash"
import * as React from "react"
import NativeFieldContainer from "./field"
import NativeRelationshipItem from "./relationshipItem"
import NativeRelationshipSearch from "./relationshipSearch"
import { observer } from "mobx-react"


const NativeRelationshipSingleField: React.FunctionComponent<IRelationshipHookProps> = observer((props) => {
  const relationHelper = useRelationshipWithProps(props)
  let content
  if (!isNil(relationHelper.value)) {
    const obj = relationHelper.relatedObject
    content = (
      <NativeRelationshipItem
        schema={props.schema}
        item={obj}
        addId={relationHelper.addId}
        removeId={relationHelper.removeId}
        isAdd={false}
      />
    )
  } else {
    content = (
      <NativeRelationshipSearch
        {...relationHelper}
        {...props}
      />
    )
  }
  return (
    <NativeFieldContainer {...props}>
      {content}
    </NativeFieldContainer>
  )
})

export default NativeRelationshipSingleField
