import * as React from 'react'
import * as ReactDOM from 'react-dom'
import App from "./app"
import { RouterStore } from '@xpfw/router';
declare const document: any
declare const module: any
// Your top level component


// Render your app
if (document !== 'undefined') {
  let renderMethod: any
  document.addEventListener("DOMContentLoaded", function(event: any) { 
    const rootEle =  document.getElementById('root')
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
  });
}
