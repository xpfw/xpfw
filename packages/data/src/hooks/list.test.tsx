import { listTest } from "@xpfw/data-tests"
import "isomorphic-fetch"
import * as React from "react"
import { IListHookProps, nextPage, prevPage, useListWithProps } from "./list"

const testFunc: React.FunctionComponent<IListHookProps> = (props) => {
  const rem = useListWithProps(props)
  return (
    <div>
      {JSON.stringify(rem, undefined, 2)}
    </div>
  )
}

listTest(testFunc, nextPage, prevPage)
