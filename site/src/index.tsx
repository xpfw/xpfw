import process from "process"
global.process = process

import RouterStore  from './components/router';
import React from 'react'
import ReactDOM from 'react-dom'
import App from "./app"
declare const document: any
declare const module: any
// Your top level component

// Render your app
if (document !== "undefined") {
  let renderMethod: any
  document.addEventListener("DOMContentLoaded", () => {
    const rootEle =  document.getElementById("root")
    renderMethod = rootEle.children.length === 0 ? ReactDOM.render : ReactDOM.hydrate
    if (document.location.pathname.length > 0) {
      RouterStore.visit({path: document.location.pathname})
    }
    const render = (Comp: any) => {
      renderMethod(Comp, rootEle)
    }

    // Render!
    render(<App />)
    window.onpopstate = () => {
      console.log("IN POP")
      RouterStore.back()
    }
   })
}
