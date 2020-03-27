import { editTest } from "@xpfw/data-tests"
import "isomorphic-fetch"
import * as React from "react"
import { IEditHookProps, submitEdit, useEditWithProps } from "./edit"

const testFunc: React.FunctionComponent<IEditHookProps> = (props) => {
  const edited = useEditWithProps(props)
  return (
    <div>
      {JSON.stringify(edited, undefined, 2)}
    </div>
  )
}

editTest(testFunc, submitEdit)
