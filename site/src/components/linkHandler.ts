import RouterStore from "./router"

const linkClickHandler = (e: any) => {
  console.log("HANDLING LINK ", e.nativeEvent)
  window.history.pushState({}, "", e.nativeEvent.target.pathname)
  e.preventDefault()
  RouterStore.visit({path: e.nativeEvent.target.pathname})
  console.log("PUSHED PATH")
  return false
}

export default linkClickHandler