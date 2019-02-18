import { editTest } from "@xpfw/data-tests"
import "isomorphic-fetch"
import * as React from "react"
import useEdit, { submitEdit } from "./edit"

const testFunc: React.FunctionComponent<any> = (props) => {
  const edited = useEdit(props.id, props.schema, props.mapTo, props.prefix, props.reset)
  return (
    <div>
      {JSON.stringify(edited, undefined, 2)}
    </div>
  )
}

editTest(testFunc, submitEdit)
