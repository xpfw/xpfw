import * as rtr from "preact-render-to-json"
import * as React from "react"

export default (Component: any, name: string) => {
  expect(rtr(Component)).toMatchSnapshot(name)
}
