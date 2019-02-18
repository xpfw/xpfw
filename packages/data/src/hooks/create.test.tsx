import { createTest } from "@xpfw/data-tests"
import "isomorphic-fetch"
import useCreate, { submitCreate } from "./create"
import * as React from "react"

const testFunc: React.FunctionComponent<any> = (props) => {
  const created = useCreate(props.schema, props.mapTo, props.prefix, props.reset)
  return (
    <div>
      {JSON.stringify(created, undefined, 2)}
    </div>
  )
}

createTest(testFunc, submitCreate)
