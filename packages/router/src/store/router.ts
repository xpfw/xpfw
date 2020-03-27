import { observable, toJS, action } from "mobx"
export interface IRoute {
  path: string
  component: React.ElementType<any>
}
export interface IRouteState {
  path: string
  params?: any
}

export class RouterStore {
  @observable
  private navStack: any[] = [
    {path: "/", params: {}}
  ]
  @observable
  private currentIndex = 0
  @observable
  private routes: IRoute[] = []

  public registerRoute(path: string, component: any) {
    this.routes.push({path, component})
  }

  public getCurrentComponent() {
    const currentRoute = this.getCurrentRoute()
    if (currentRoute != null) {
      for (const route of this.routes) {
        if (route.path === currentRoute.path) {
          return route.component
        }
      }
    }
    return undefined
  }

  public getCurrentRoute(): any {
    return this.navStack[this.currentIndex]
  }

  @action
  public back() {
    if (this.currentIndex === 0) {
      // nothing
    } else {
      this.navStack.pop()
      this.currentIndex--
    }
  }

  @action
  public visit(newRoute: IRouteState) {
    this.navStack.push(newRoute)
    this.currentIndex++
  }
}

export default new RouterStore()
