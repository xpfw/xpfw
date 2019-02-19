import { FormStore, useFieldWithValidation, useObject } from "@xpfw/form"
import { get, isNil } from "lodash"
import { action, observable } from "mobx"
import BackendClient from "../client"
import { AuthForm, PwField } from "../hooks/auth"
import dataOptions from "../options"
import DbStore from "./db"

export class UserStore {
  @observable
  public user: any = null
  @observable
  private loggedIn: boolean = false
  @observable
  private loading: boolean = false
  @observable
  private authErr: any = null
  @observable
  private connected: boolean = false

  public getLoading() {
    return this.loading
  }

  public getUser() {
    return this.user
  }

  public getLoggedIn() {
    return this.loggedIn
  }

  public getAuthErr() {
    return this.authErr
  }

  public getConnected() {
    return this.connected
  }

  public setLoggedIn(user: any) {
    this.user = user
    const ADbStore: any = DbStore
    // TODO: more elegant solution maybe?
    // doing this because xpfw/ui-feathers already fetdches from server so two roundtrips would be dumb
    if (isNil(ADbStore.getState[dataOptions.userCollection])) {
      ADbStore.getState[dataOptions.userCollection] = {}
    }
    ADbStore.getState[dataOptions.userCollection][get(user, dataOptions.idPath, "-1")] = user
    this.loggedIn = true
    this.authErr = null
  }

  public async login() {
    const loginData = FormStore.getValue(String(AuthForm.title))
    loginData.strategy = "local"
    try {
      this.loading = true
      const loginRes = await BackendClient.client.login(loginData)
      this.loading = false
      const user = get(loginRes, "user")
      this.setLoggedIn(user)
      // Reset Password after succesful login
      useFieldWithValidation(useObject(AuthForm).fields[1].schema).setValue("")
      return loginRes
    } catch (e) {
      this.authErr = e
      this.loggedOut()
      return e
    }
  }

  public async register() {
    const newUser = FormStore.getValue(String(AuthForm.title))
    try {
      this.loading = true
      const res = await BackendClient.client.register(newUser)
      this.loading = false
      this.setLoggedIn(res)
      return res
    } catch (e) {
      this.authErr = e.toString()
      this.loggedOut()
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
  }

  public setConnected(newCon: boolean) {
    this.connected = newCon
  }
}

export default new UserStore()
