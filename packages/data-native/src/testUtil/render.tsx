import * as React from "react"
import rtr from "react-test-renderer"

export default (Component: any, name: string) => {
  const rendered = rtr.create(Component)
  expect(rendered.toJSON()).toMatchSnapshot(name)
  rendered.unmount()
}
