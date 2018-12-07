import * as React from 'react'
import * as ReactDOM from 'react-dom'
import App from "./app"
import { RouterStore } from '@xpfw/router';
declare const document: any
declare const module: any
// Your top level component


// Render your app
console.log("checking for doc")
if (document !== 'undefined') {
  console.log("got doc")
  console.log("loaded")
  let renderMethod: any
  document.addEventListener("DOMContentLoaded", () => {

    console.log("domcontent loaded", document.location.pathname)
    const rootEle =  document.getElementById('root')
    console.log("ROOT IS", rootEle)
    renderMethod = rootEle.children.length === 0 ? ReactDOM.render : ReactDOM.hydrate
    if (document.location.pathname.length > 0) {
      RouterStore.visit({path: document.location.pathname})
    } 
    const render = (Comp: any) => {
      console.log("got ele", rootEle, rootEle.children)
      renderMethod(Comp, rootEle)
    }
  
    // Render!
    render(<App />)
   })
}
