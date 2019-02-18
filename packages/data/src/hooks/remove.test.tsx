import { removeTest } from "@xpfw/data-tests"
import "isomorphic-fetch"
import useRemove, { submitRemove } from "./remove"
import * as React from "react"

const testFunc: React.FunctionComponent<any> = (props) => {
  const rem = useRemove(props.id, props.schema)
  return (
    <div>
      {JSON.stringify(rem, undefined, 2)}
    </div>
  )
}

removeTest(testFunc, submitRemove)
