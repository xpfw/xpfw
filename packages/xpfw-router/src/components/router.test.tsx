import * as render from "preact-render-to-json"
import * as React from "react"
import Router from "../components/router"
import RouterStore from "../store/router"

const makeMockElement = (name: string) => {
  return class extends React.Component<any, any> {
    public render() {
      return (
        <div className={name}>
          {JSON.stringify(this.props)}
        </div>
      )
    }
  }
}

test("Basic Fields Test", () => {
  const emptycomp = makeMockElement("404")
  expect(render(<Router emptyComponent={emptycomp} />)).toMatchSnapshot("renderig 404")
  RouterStore.registerRoute("/", makeMockElement("home"))
  RouterStore.registerRoute("/a", makeMockElement("a"))
  RouterStore.registerRoute("/b", makeMockElement("b"))
  RouterStore.registerRoute("/c", makeMockElement("c"))
  RouterStore.visit({path: "/b", params: {my: "arg"}})
  expect(render(<Router emptyComponent={emptycomp} />)).toMatchSnapshot("renderig b")
  RouterStore.visit({path: "/c", params: {gfsdf: "tas"}})
  expect(render(<Router emptyComponent={emptycomp} />)).toMatchSnapshot("renderig c")
  RouterStore.visit({path: "/a", params: {xvcb: "asdf"}})
  expect(render(<Router emptyComponent={emptycomp} />)).toMatchSnapshot("renderig a")
  RouterStore.visit({path: "/a", params: {gewar: "yvcxv"}})
  expect(render(<Router emptyComponent={emptycomp} />)).toMatchSnapshot("renderig a different params")
  RouterStore.back()
  expect(render(<Router emptyComponent={emptycomp} />)).toMatchSnapshot("renderig a with old params because back")
  RouterStore.back()
  expect(render(<Router emptyComponent={emptycomp} />)).toMatchSnapshot("back to c")
  RouterStore.back()
  expect(render(<Router emptyComponent={emptycomp} />)).toMatchSnapshot("back to b")
  RouterStore.back()
  expect(render(<Router emptyComponent={emptycomp} />)).toMatchSnapshot("back to home")
  RouterStore.back()
  RouterStore.back()
  RouterStore.back()
  expect(render(<Router emptyComponent={emptycomp} />)).toMatchSnapshot("back to home multi back no effect")
  RouterStore.visit({path: "/gfadsdf", params: {iou: ".-ö"}})
  RouterStore.visit({path: "/gfadsdf", params: {jk: "hj"}})
  expect(render(<Router emptyComponent={emptycomp} />)).toMatchSnapshot("invalid oute")
  RouterStore.back()
  expect(render(<Router emptyComponent={emptycomp} />)).toMatchSnapshot("still invalid oute")
  RouterStore.back()
  expect(render(<Router emptyComponent={emptycomp} />)).toMatchSnapshot("back home")
})
