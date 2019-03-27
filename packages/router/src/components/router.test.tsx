import * as React from "react"
import Router from "../components/router"
import RouterStore from "../store/router"
import render from "../testUtil/render"

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
  render(<Router emptyComponent={emptycomp} />, "renderig 404")
  RouterStore.registerRoute("/", makeMockElement("home"))
  RouterStore.registerRoute("/a", makeMockElement("a"))
  RouterStore.registerRoute("/b", makeMockElement("b"))
  RouterStore.registerRoute("/c", makeMockElement("c"))
  RouterStore.visit({path: "/b", params: {my: "arg"}})
  render(<Router emptyComponent={emptycomp} />, "renderig b")
  RouterStore.visit({path: "/c", params: {gfsdf: "tas"}})
  render(<Router emptyComponent={emptycomp} />, "renderig c")
  RouterStore.visit({path: "/a", params: {xvcb: "asdf"}})
  render(<Router emptyComponent={emptycomp} />, "renderig a")
  RouterStore.visit({path: "/a", params: {gewar: "yvcxv"}})
  render(<Router emptyComponent={emptycomp} />, "renderig a different params")
  RouterStore.back()
  render(<Router emptyComponent={emptycomp} />, "renderig a with old params because back")
  RouterStore.back()
  render(<Router emptyComponent={emptycomp} />, "back to c")
  RouterStore.back()
  render(<Router emptyComponent={emptycomp} />, "back to b")
  RouterStore.back()
  render(<Router emptyComponent={emptycomp} />, "back to home")
  RouterStore.back()
  RouterStore.back()
  RouterStore.back()
  render(<Router emptyComponent={emptycomp} />, "back to home multi back no effect")
  RouterStore.visit({path: "/gfadsdf", params: {iou: ".-ö"}})
  RouterStore.visit({path: "/gfadsdf", params: {jk: "hj"}})
  render(<Router emptyComponent={emptycomp} />, "invalid oute")
  RouterStore.back()
  render(<Router emptyComponent={emptycomp} />, "still invalid oute")
  RouterStore.back()
  render(<Router emptyComponent={emptycomp} />, "back home")
})
