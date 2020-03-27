import { IRelationshipHookProps, useRelationshipWithProps } from "@xpfw/data"
import { get, isNil } from "lodash"
import { observer } from "mobx-react-lite"
import * as React from "react"
import WebRelationshipItem from "./relationshipItem"
import WebRelationshipSearch from "./relationshipSearch"
import { getLabelFromProps } from "@xpfw/form"

const WebRelationshipSingle: React.FunctionComponent<IRelationshipHookProps> = observer((props) => {
  const relationHelper = useRelationshipWithProps(props)
  let content: any
  if (!isNil(relationHelper.value)) {
    const obj = relationHelper.relatedObject
    content = (
      <WebRelationshipItem schema={props.schema} item={obj} addId={relationHelper.addId} removeId={relationHelper.removeId} isAdd={false} />
    )
  } else {
    content = (
      <div>
        <WebRelationshipSearch
          {...relationHelper}
          {...props}
        />
      </div>
    )
  }
  return (
    <div className="field">
      <label className="label">Relationship {getLabelFromProps(props)}</label>
      <div className="control">
        {content}
      </div>
    </div>
  )
})

export default WebRelationshipSingle
