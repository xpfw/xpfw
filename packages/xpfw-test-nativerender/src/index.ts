declare const require: any
const React = require("react")
const rtr = require("react-test-renderer")

const render = (Component: any) => {
  const rendered = rtr.create(Component)
  const JSON = rendered.toJSON()
  rendered.unmount()
  return JSON
}

export default render
