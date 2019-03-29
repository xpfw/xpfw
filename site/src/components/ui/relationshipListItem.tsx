import { IGetHookProps, useGetWithProps } from "@xpfw/data"
import { get, isNil } from "lodash"
import { observer } from "mobx-react-lite"
import * as React from "react"

const RelationshipListItem: React.FunctionComponent<IGetHookProps & {schema: any}> = observer((props) => {
  const getProps = useGetWithProps(props)
  let name = "loading"
  let id = "loading"
  const obj = getProps.item
  if (!isNil(obj)) {
    name = get(obj, get(props, "schema.relationship.namePath", "id"), "NOTFOUND")
    id = get(obj, get(props, "schema.relationship.idPath", "id"), "NOTFOUND")
  }
  return (
    <span>
      {name}
    </span>
  )
})

export default RelationshipListItem

