import { removeTest } from "@xpfw/data-tests"
import "isomorphic-fetch"
import * as React from "react"
import { IRemoveHookProps, submitRemove, useRemoveWithProps } from "./remove"

const testFunc: React.FunctionComponent<IRemoveHookProps> = (props) => {
  const rem = useRemoveWithProps(props)
  return (
    <div>
      {JSON.stringify(rem, undefined, 2)}
    </div>
  )
}

removeTest(testFunc, submitRemove)
