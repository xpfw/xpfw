import { RouterStore } from "@xpfw/router"

const linkClickHandler = (e: any) => {
  window.history.pushState({}, "", e.nativeEvent.target.pathname)
  e.preventDefault()
  RouterStore.visit({path: e.nativeEvent.target.pathname})
  return false
}

export default linkClickHandler