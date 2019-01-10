import * as React from "react"
import "./customizedBulma.sass"
import { Router, RouterStore } from "@xpfw/router"
import Home from "./containers/home"
import core from "./containers/core"
import form from "./containers/form"
import ui from "./containers/ui"
import Page404 from "./containers/404";
import PageLicenses from "./containers/licenses";
import PageStats from "./containers/stats";


RouterStore.registerRoute("/", Home)
RouterStore.registerRoute("/index.html", Home)
RouterStore.registerRoute("/core.html", core)
RouterStore.registerRoute("/form.html", form)
RouterStore.registerRoute("/ui.html", ui)
RouterStore.registerRoute("/stats.html", PageStats)
RouterStore.registerRoute("/licenses.html", PageLicenses)

class App extends React.Component<any, any> {
    public render() {
        return (
            <Router
                emptyComponent={Page404}
            />
        )
    }
}

export default App