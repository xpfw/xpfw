import { FormStore } from "@xpfw/form-shared"
import { globals } from "@xpfw/validate"
import { get, isNil, isNumber, set } from "lodash"
import { AutoSubscribeStore, autoSubscribeWithKey, StoreBase } from "resub"
import { IPersistableStore } from "resub-persist"
import BackendClient from "../client"
import { AuthForm, PwField } from "../components/auth"
import DbStore from "./db"

@AutoSubscribeStore
export class UserStore extends StoreBase implements IPersistableStore {
  public name = "userStore"
  public user: any = null
  private loggedIn: boolean = false
  private loading: boolean = false
  private authErr: any = null
  private connected: boolean = false

  public getPropKeys() { return ["user", "loggedIn", "loading", "authErr", "connected"] }

  @autoSubscribeWithKey("loading")
  public getLoading() {
    return this.loading
  }

  @autoSubscribeWithKey("user")
  public getUser() {
    return this.user
  }

  @autoSubscribeWithKey("loggedIn")
  public getLoggedIn() {
    return this.loggedIn
  }

  @autoSubscribeWithKey("authErr")
  public getAuthErr() {
    return this.authErr
  }

  @autoSubscribeWithKey("connected")
  public getConnected() {
    return this.connected
  }

  public setLoggedIn(user: any) {
    this.user = user
    const ADbStore: any = DbStore
    // TODO: more elegant solution maybe?
    // doing this because xpfw/ui-feathers already fetdches from server so two roundtrips would be dumb
    if (isNil(ADbStore.getState[globals.options.userCollection])) {
      ADbStore.getState[globals.options.userCollection] = {}
    }
    ADbStore.getState[globals.options.userCollection][get(user, globals.options.userIdPath, "-1")] = {result: user}
    this.loggedIn = true
    this.authErr = null
    this.trigger()
  }

  public async login() {
    const loginData = FormStore.getFormData(AuthForm)
    loginData.strategy = "local"
    try {
      this.loading = true
      this.trigger()
      const loginRes = await BackendClient.client.login(loginData)
      this.loading = false
      const user = get(loginRes, "user")
      this.setLoggedIn(user)
      FormStore.setValue(PwField.mapTo, "")
      return loginRes
    } catch (e) {
      this.authErr = e
      this.loggedOut()
      return e
    }
  }

  public async register() {
    const newUser = FormStore.getFormData(AuthForm)
    try {
      this.loading = true
      this.trigger()
      const res = await BackendClient.client.register(newUser)
      this.loading = false
      this.setLoggedIn(res)
      this.trigger()
      return res
    } catch (e) {
      this.authErr = e
      this.loading = false
      this.trigger()
      return e
    }
  }

  public async logout() {
    await BackendClient.client.logout()
    this.loggedOut()
  }

  public loggedOut() {
    this.user = null
    this.loggedIn = false
    this.loading = false
    this.trigger()
  }
  public setConnected(newCon: boolean) {
    this.connected = newCon
    this.trigger("connected")
  }
}

export default new UserStore()
