import { get, isNil } from "lodash"
import * as React from "react"
import { ComponentBase } from "resub"
import RouterStore, { IRouteState } from "../store/router"

export interface ISharedField extends React.Props<any> {
  emptyComponent: any
}

export interface ISharedFieldState {
  component?: any
  route?: IRouteState
}

class Router extends ComponentBase<ISharedField, any> {
  public render() {
    const Component: any = this.state.component
    return <Component route={get(this, "state.route")} />
  }
  protected _buildState(props: ISharedField, initialBuild: boolean): ISharedFieldState {
    let component: any = RouterStore.getCurrentComponent()
    if (isNil(component)) {
      component = props.emptyComponent
    }
    return {
      component, route: RouterStore.getCurrentRoute()
    }
  }
}

export default Router
