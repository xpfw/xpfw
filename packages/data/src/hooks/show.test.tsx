import { showTest } from "@xpfw/data-tests"
import "isomorphic-fetch"
import * as React from "react"
import { IGetHookProps, useGetWithProps } from "./show"

const testFunc: React.FunctionComponent<IGetHookProps> = (props) => {
  const u = useGetWithProps(props)
  return (
    <div>
      {JSON.stringify(u, undefined, 2)}
    </div>
  )
}

showTest(testFunc)
