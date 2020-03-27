import { FeathersClient } from "@xpfw/data-feathers"
import { toJS } from "@xpfw/data-tests"
import { FormStore, useFieldWithValidation, useObject } from "@xpfw/form"
import { getRandomApp } from "@xpfw/test-util"
import "isomorphic-fetch"
import BackendClient from "../client"
import { AuthForm, MailField, PwField } from "../hooks/auth"
import UserStore from "./user"

BackendClient.client = FeathersClient

test("User Store Test", async () => {
  const appRef = await getRandomApp("a", false, BackendClient.client, true)
  const authHook = useObject(AuthForm)
  const mailHook = useFieldWithValidation(authHook.fields[0].schema)
  const pwHook = useFieldWithValidation(authHook.fields[1].schema)
  mailHook.setValue("admin")
  pwHook.setValue("admin")
  expect(toJS(UserStore)).toMatchSnapshot("before register")
  expect(toJS(FormStore.formData)).toMatchSnapshot("before registerform")
  const registerRes = await UserStore.register()
  expect(registerRes).toMatchSnapshot("result of registration")
  expect(toJS(FormStore.formData)).toMatchSnapshot("after register form")
  expect(toJS(UserStore)).toMatchSnapshot("after register")
  await UserStore.login()
  expect(toJS(UserStore)).toMatchSnapshot("after login")
  expect(toJS(FormStore.formData)).toMatchSnapshot("after login form")
  await UserStore.logout()
  expect(toJS(UserStore)).toMatchSnapshot("after logout")
  pwHook.setValue("admin")
  await UserStore.login()
  expect(toJS(UserStore)).toMatchSnapshot("after relogin")
  expect(toJS(FormStore.formData)).toMatchSnapshot("after relogin form")
  await UserStore.logout()
  expect(toJS(UserStore)).toMatchSnapshot("after logout")
  const invalidLogin = await UserStore.login()
  expect(UserStore.getLoading()).toBeFalsy()
  expect(UserStore.getLoggedIn()).toBeFalsy()
  expect(UserStore.getUser()).toBeNull()
  expect(UserStore.getAuthErr() == null)
  const client = BackendClient.client.client
  BackendClient.client.client = null
  const reRegister = await UserStore.register()
  expect(toJS(UserStore)).toMatchSnapshot("after register err")
  BackendClient.client.client = client

  await expect(BackendClient.client.connectTo(`http://localhost:${appRef.port}`, {
    makeAuth: true, userStore: UserStore, useRest: true
  })).rejects.toMatchSnapshot("makeauth")

  await appRef.cleanUp()
}, 10000)
