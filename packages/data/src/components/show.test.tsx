import { showTest } from "@xpfw/data-tests"
import "isomorphic-fetch"
import * as React from "react"
import useShow from "./show"
import { get } from "lodash-es"

const testFunc: React.FunctionComponent<any> = (props) => {
  const u = useShow(props.id, props.collection)
  return (
    <div>
      {JSON.stringify(u, undefined, 2)}
    </div>
  )
}

showTest(testFunc)
