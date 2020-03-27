import { createTest } from "@xpfw/data-tests"
import "isomorphic-fetch"
import * as React from "react"
import { ICreateHookProps, submitCreate, useCreateWithProps } from "./create"

const testFunc: React.FunctionComponent<ICreateHookProps> = (props) => {
  const created = useCreateWithProps(props)
  return (
    <div>
      {JSON.stringify(created, undefined, 2)}
    </div>
  )
}

createTest(testFunc, submitCreate)
