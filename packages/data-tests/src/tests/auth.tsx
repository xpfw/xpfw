import {
  AuthForm, BackendClient, dataOptions,
  DbStore, MailField, PwField, UserStore
} from "@xpfw/data"
import { FeathersClient } from "@xpfw/data-feathers"
import { FormStore, useField, useFieldWithValidation, useObject } from "@xpfw/form"
import { getRandomApp } from "@xpfw/test-util"
import { get, isFunction } from "lodash"
import * as React from "react"
import render from "../testUtil/render"

BackendClient.client = FeathersClient
dataOptions.idPath = "id"

const testAuth = (MockEle: any, submitLogin?: any, submitLogout?: any, submitRegister?: any) => {
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
    const MockedAuth = MockEle
    const hookedForm = useObject(AuthForm)
    const hookedMail = useFieldWithValidation(hookedForm.fields[0].schema)
    const hookedPw = useFieldWithValidation(hookedForm.fields[1].schema)
    hookedMail.setValue("admin")
    hookedPw.setValue("admin")
    render(<MockedAuth />, "before register")
    const registerRes = await submitRegister()
    expect(registerRes).toMatchSnapshot("result of register and lgoin at once")
    render(<MockedAuth />, "after register")
    await submitLogout()
    render(<MockedAuth />, "after logout")
    hookedPw.setValue("admin")
    await submitLogin()
    render(<MockedAuth />, "after relogin")
    await UserStore.logout()
    render(<MockedAuth />, "after logout")
    const invalidLogin = await UserStore.login()
    render(<MockedAuth />, "after invalid login")
    hookedPw.setValue("WRONGPW")
    await UserStore.login()
    render(<MockedAuth />, "after wrong password login")
    const client = BackendClient.client.client
    BackendClient.client.client = null
    const reRegister = await UserStore.register()
    render(<MockedAuth />, "after register err")
    BackendClient.client.client = client
    await appRef.cleanUp()
  }, 10000)
}

export default testAuth
