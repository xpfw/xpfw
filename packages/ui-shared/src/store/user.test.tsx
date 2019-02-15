import { FormStore } from "@xpfw/form-shared"
import { getRandomApp } from "@xpfw/test-util"
import { FeathersClient } from "@xpfw/ui-feathers"
import { TestDefs, ValidationRegistry } from "@xpfw/validate"
import "isomorphic-fetch"
import { get, isNil } from "lodash"
import { matchStoreState } from "resub-persist"
import BackendClient from "../client"
import { AuthForm, MailField, PwField } from "../components/auth"
import UserStore from "./user"

BackendClient.client = FeathersClient

ValidationRegistry.registerForm(AuthForm)

test("User Store Test", async () => {
  const appRef = await getRandomApp("a", false, BackendClient.client, true)
  FormStore.setValue(MailField.mapTo, "admin")
  FormStore.setValue(PwField.mapTo, "admin")
  matchStoreState(UserStore, "before register")
  matchStoreState(FormStore, "before registerform")
  const registerRes = await UserStore.register()
  expect(registerRes).toMatchSnapshot("result of registration")
  matchStoreState(FormStore, "after register form")
  matchStoreState(UserStore, "after register")
  await UserStore.login()
  matchStoreState(UserStore, "after login")
  matchStoreState(FormStore, "after login form")
  await UserStore.logout()
  matchStoreState(UserStore, "after logout")
  FormStore.setValue(PwField.mapTo, "admin")
  await UserStore.login()
  matchStoreState(UserStore, "after relogin")
  matchStoreState(FormStore, "after relogin form")
  await UserStore.logout()
  matchStoreState(UserStore, "after logout")
  const invalidLogin = await UserStore.login()
  expect(UserStore.getLoading()).toBeFalsy()
  expect(UserStore.getLoggedIn()).toBeFalsy()
  expect(UserStore.getUser()).toBeNull()
  expect(isNil(UserStore.getAuthErr()))
  const client = BackendClient.client.client
  BackendClient.client.client = null
  const reRegister = await UserStore.register()
  matchStoreState(UserStore, "after register err")
  BackendClient.client.client = client

  await expect(BackendClient.client.connectTo(`http://localhost:${appRef.port}`, {
    makeAuth: true, userStore: UserStore, useRest: true
  })).rejects.toMatchSnapshot("makeauth")

  await appRef.cleanUp()
}, 10000)
