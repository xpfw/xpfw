import { IRelationshipHookProps, useRelationshipWithProps } from "@xpfw/data"
import { observer } from "mobx-react"
import * as React from "react"
import WebRelationshipItem from "./relationshipItem"
import WebRelationshipSearch from "./relationshipSearch"
import { getLabelFromProps } from "@xpfw/form"

const WebRelationshipMulti: React.FunctionComponent<IRelationshipHookProps> = observer((props) => {
  const relationHelper = useRelationshipWithProps(props)
  let content
  const gotVal = Array.isArray(relationHelper.value) && relationHelper.value.length > 0
  if (!gotVal || relationHelper.displayMode) {
    content = (
      <div>
        <WebRelationshipSearch
          {...relationHelper}
          {...props}
        />
      </div>
    )
  } else {
    const relationItems = []
    for (const child of relationHelper.relatedObject) {
      relationItems.push(<WebRelationshipItem schema={props.schema} item={child} addId={relationHelper.addId} removeId={relationHelper.removeId} isAdd={false} />)
    }
    content = (
      <div>
        <a className="button" onClick={relationHelper.showDisplay}>Search</a>
        {relationItems}
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

export default WebRelationshipMulti
