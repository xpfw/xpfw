import { IRemoveHookProps, useRemoveWithProps } from "@xpfw/data"
import { get } from "lodash"
import { observer } from "mobx-react"
import * as React from "react"

const BulmaRemove: React.FunctionComponent<IRemoveHookProps> = observer((props) => {
  const removeProps = useRemoveWithProps(props)
  const result = get(removeProps, "state", false)
  return (
    <div>
      {result ? (
        <a className="button is-success">Deleted</a>
      ) : (removeProps.loading ? (
        <a className="button is-info">Loading...</a>
      ) : (
        <a className="button is-warning" onClick={removeProps.submitRemove}>Delete</a>
      ))}
    </div>
  )
})

export default BulmaRemove
export {
  IRemoveHookProps
}
