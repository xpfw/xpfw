import RouterStore from "./components/router"
import * as React from "react"
import { observer } from "mobx-react"
import Page404 from "./containers/404"
import data from "./containers/data"
import form from "./containers/form"
import Home from "./containers/home"
import PageLicenses from "./containers/licenses"
import "./customizedBulma.sass"

RouterStore.registerRoute("/", Home)
RouterStore.registerRoute("/index.html", Home)
RouterStore.registerRoute("/form.html", form)
RouterStore.registerRoute("/data.html", data)
// RouterStore.registerRoute("/stats.html", PageStats)
RouterStore.registerRoute("/licenses.html", PageLicenses)

const CRouter: React.FunctionComponent<any> = observer((props) =>  {
    console.log(`in router render`, RouterStore.getCurrentRoute().path)
    let Component: any = RouterStore.getCurrentComponent()
    if (Component == null) {
      Component = props.emptyComponent
    }
    return <Component route={RouterStore.getCurrentRoute()} />
  })
  
const App: React.FunctionComponent<{}> = () => {
    return (
        <CRouter
            emptyComponent={Page404}
        />
    )
}

export default App
