import { IRelationshipHookProps, useRelationshipWithProps } from "@xpfw/data"
import { get } from "lodash"
import { observer } from "mobx-react-lite"
import * as React from "react"
import WebRelationshipItem from "./relationshipItem"
import WebRelationshipSearch from "./relationshipSearch"

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
      <label className="label">Relationship {get(props, "schema.label", get(props, "schema.title"))}</label>
      <div className="control">
        {content}
      </div>
    </div>
  )
})

export default WebRelationshipMulti
