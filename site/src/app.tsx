import * as React from "react"
import "./customizedBulma.sass"
import { Router, RouterStore } from "@xpfw/router"
import Home from "./containers/home"
import core from "./containers/core"
import form from "./containers/form"
import ui from "./containers/ui"


RouterStore.registerRoute("/", Home)
RouterStore.registerRoute("/index.html", Home)
RouterStore.registerRoute("/core.html", core)
RouterStore.registerRoute("/form.html", form)
RouterStore.registerRoute("/ui.html", ui)

class App extends React.Component<any, any> {
    public render() {
        const text = this.state && this.state.clicked ? "CHanged text" : "Unchanged text"
        return (
            <Router
                emptyComponent={<div>404 not found</div>}
            />
        )
    }
}

export default App