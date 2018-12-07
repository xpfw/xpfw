import { get, isNil, set } from "lodash"
import { AutoSubscribeStore, autoSubscribeWithKey, key, StoreBase } from "resub"
import { IPersistableStore } from "resub-persist"

const CURRENTROUTEKEY = "currentRoute"

export interface IRoute {
  path: string
  component: any
}
export interface IRouteState {
  path: string
  params?: any
}

@AutoSubscribeStore
export class RouterStore extends StoreBase implements IPersistableStore {
    public name = "router"
    private navStack: any[] = [
      {path: "/", params: {}}
    ]
    private currentIndex = 0
    private routes: IRoute[] = []
    public getPropKeys() { return ["navStack"] }

    public registerRoute(path: string, component: any) {
      this.routes.push({path, component})
      this.trigger(CURRENTROUTEKEY)
    }

    @autoSubscribeWithKey(CURRENTROUTEKEY)
    public getCurrentComponent() {
      const currentRoute = this.getCurrentRoute()
      for (const route of this.routes) {
        if (route.path === currentRoute.path) {
          return route.component
        }
      }
    }

    @autoSubscribeWithKey(CURRENTROUTEKEY)
    public getCurrentRoute(): any {
      return this.navStack[this.currentIndex]
    }

    public back() {
      if (this.currentIndex === 0) {
        // nothing
      } else {
        this.navStack.pop()
        this.currentIndex--
        this.trigger(CURRENTROUTEKEY)
      }
    }

    public visit(newRoute: IRouteState) {
      this.navStack.push(newRoute)
      this.currentIndex++
      this.trigger(CURRENTROUTEKEY)
    }

}

export default new RouterStore()
