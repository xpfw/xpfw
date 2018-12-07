import { FormStore } from "@xpfw/form-shared"
import { getRandomApp } from "@xpfw/test-util"
import { FeathersClient } from "@xpfw/ui-feathers"
import {
  AuthForm, BackendClient, DbStore,
  MailField, PwField, SharedFormAuth, SharedFormCreate, UserStore
} from "@xpfw/ui-shared"
import { globals, ValidationRegistry } from "@xpfw/validate"
import { get, isFunction } from "lodash"
import * as React from "react"
import { matchStoreState } from "resub-persist"
import makeMockElement from "../testUtil/baseMock"
import render from "../testUtil/render"

BackendClient.client = FeathersClient
globals.options.userIdPath = "id"

const testAuth = (MockEle: any, submitLogin?: any, submitLogout?: any, submitRegister?: any) => {
  ValidationRegistry.registerForm(AuthForm)
  if (!isFunction(submitLogin)) {
    submitLogin = UserStore.login
  }
  if (!isFunction(submitLogout)) {
    submitLogin = UserStore.logout
  }
  if (!isFunction(submitRegister)) {
    submitLogin = UserStore.register
  }
  test("User Store Test", async () => {
    const appRef = await getRandomApp("a", false, BackendClient.client, false, {
      userStore: UserStore
    })
    const MockedAuth = SharedFormAuth(MockEle)
    FormStore.setValue(MailField.mapTo, "admin")
    FormStore.setValue(PwField.mapTo, "admin")
    render(<MockedAuth />, "before register")
    const registerRes = await submitRegister()
    expect(registerRes).toMatchSnapshot("result of register and lgoin at once")
    render(<MockedAuth />, "after register")
    await submitLogout()
    render(<MockedAuth />, "after logout")
    expect(await BackendClient.client.client.passport.getJWT()).toBeNull()
    FormStore.setValue(PwField.mapTo, "admin")
    await UserStore.login()
    render(<MockedAuth />, "after relogin")
    await UserStore.logout()
    render(<MockedAuth />, "after logout")
    const invalidLogin = await UserStore.login()
    render(<MockedAuth />, "after invalid login")
    const client = BackendClient.client.client
    BackendClient.client.client = null
    const reRegister = await UserStore.register()
    render(<MockedAuth />, "after register err")
    BackendClient.client.client = client
    await appRef.cleanUp()
  }, 10000)
}

export default testAuth
