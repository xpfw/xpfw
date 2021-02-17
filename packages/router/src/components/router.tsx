import { observer } from "mobx-react"
import * as React from "react"
import RouterStore, { IRouteState } from "../store/router"

export interface IRouterProps extends React.ClassAttributes<any> {
  emptyComponent: React.ElementType<any>
}

export interface IRouterPropsState {
  component?: any
  route?: IRouteState
}

const Router: React.FunctionComponent<IRouterProps> = observer((props) =>  {
  console.log(`in router render ${RouterStore.getCurrentRoute()}`)
  let Component = RouterStore.getCurrentComponent()
  if (Component == null) {
    Component = props.emptyComponent
  }
  return <Component route={RouterStore.getCurrentRoute()} />
})

export default Router
