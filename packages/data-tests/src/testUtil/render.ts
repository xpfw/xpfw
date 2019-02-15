import * as rtr from "preact-render-to-json"
import * as React from "react"
const r: any = rtr
export default (Component: any, name: string) => {
  expect(r(Component)).toMatchSnapshot(name)
}
