import App from "./app"
import * as ReactDomServer from "react-dom/server"
import * as React from "react"
import { writeFileSync } from "fs";
import { RouterStore } from "@xpfw/router";

const routes = [
    {name: "index"},
    {name: "core"},
    {name: "form"},
    {name: "data"},
    {name: "stats"},
    {name: "licenses"}
]

const start = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>xpfw - Supercharge your JSON-Schema!</title>
    <meta content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0' name='viewport' />
    <link rel="icon" href="favicon.png">
    <link rel="stylesheet" href="style.css">
    <link rel="apple-touch-icon-precomposed" href="ios-favicon.png">
    <link rel="android-touch-icon" href="ios-favicon.png">
    <script src="./isoapp.js"></script>
  </head>
  <body>
    <div id="root">
`

const end = `</div>
</body>
</html>`

for (const route of routes) {
    const UntypedRouterStore: any = RouterStore
    while (UntypedRouterStore.navStack.length > 1) {
        RouterStore.back()
    }
    RouterStore.visit({path: `/${route.name}.html`})
    console.log(`${route.name} rendering with`, RouterStore.getCurrentRoute(), RouterStore.getCurrentComponent())
    writeFileSync("webpackDist/"+route.name+".html",
    `${start}${ReactDomServer.renderToString(<App />)}${end}` )
}