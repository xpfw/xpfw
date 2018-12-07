import { FormErrorStore, FormStore, LoadingStore } from "@xpfw/form-shared"
import { getRandomApp } from "@xpfw/test-util"
import { FeathersClient } from "@xpfw/ui-feathers"
import { BackendClient, DbStore, SharedFormCreate  } from "@xpfw/ui-shared"
import { globals, TestDefs } from "@xpfw/validate"
import { get, isFunction } from "lodash"
import * as React from "react"
import { matchStoreState } from "resub-persist"
import makeMockElement from "../testUtil/baseMock"
import render from "../testUtil/render"
import login from "./login"

BackendClient.client = FeathersClient
globals.options.userIdPath = "id"

const testCreate = (MockEle: any, submitCreate?: Function) => {
  test("DbStore Create Test", async () => {
    const form = TestDefs.FormNumberAndRequiredText
    const s: any = form.collection
    const appRef = await getRandomApp(s, false, BackendClient.client, true)
    const MockedCreate = SharedFormCreate(MockEle)
    const prefix = "createpref"
    render(<MockedCreate form={form} />, "before login")
    await login()
    render(<MockedCreate form={form} />, "after login")
    FormStore.setValue(TestDefs.RequiredTextField.mapTo, "myText")
    FormStore.setValue(TestDefs.NumberField.mapTo, 420)
    render(<MockedCreate form={form} />, "before create")
    if (isFunction(submitCreate)) {
      await submitCreate({props: {form}})()
    } else {
      await DbStore.create(form)
    }
    render(<MockedCreate form={form} />, "after create")
    LoadingStore.setLoading(form.model, true)
    render(<MockedCreate form={form} />, "while loading")
    LoadingStore.setLoading(form.model, false)
    DbStore.setCreateState(form.model, undefined)
    FormErrorStore.setError(form.model, {errors: ["a", "b"]})
    render(<MockedCreate form={form} />, "after purposely set invalid err")
    TestDefs.RequiredTextField.validate = {hide: {create: true}}
    render(<MockedCreate form={form} />, "hidden text")
    TestDefs.RequiredTextField.validate = {hide: {create: false, update: true, find: false}}
    render(<MockedCreate form={form} />, "not hidden in create")
    TestDefs.RequiredTextField.validate = {hide: {create: true, update: false, find: false}}
    render(<MockedCreate form={form} />, "hidden in create")

    FormStore.setValue(TestDefs.RequiredTextField.mapTo, "myText")
    FormStore.setValue(TestDefs.NumberField.mapTo, 420)
    matchStoreState(FormStore, "Before reset on mount")
    render(<MockedCreate form={form} resetOnMount />, "resetOnMount = true")
    matchStoreState(FormStore, "after reset on mount")

    // WITH PREFIX

    render(<MockedCreate form={form} prefix={prefix} />, "prefixed before create")

    FormStore.setValue(`${prefix}.${TestDefs.RequiredTextField.mapTo}`, "SECOND OBJECT")
    FormStore.setValue(`${prefix}.${TestDefs.NumberField.mapTo}`, 421)
    if (isFunction(submitCreate)) {
      await submitCreate({props: {form, prefix}})()
    } else {
      await DbStore.create(form, prefix)
    }
    render(<MockedCreate form={form} prefix={prefix} />, "prefixed after create")
    LoadingStore.setLoading(form.model, true)
    render(<MockedCreate form={form} prefix={prefix} />, "prefixed while loading")
    LoadingStore.setLoading(form.model, false)
    DbStore.setCreateState(`${prefix}.${form.model}`, undefined)
    FormErrorStore.setError(`${prefix}.${form.model}`, {errors: ["a", "b"]})
    render(<MockedCreate form={form} prefix={prefix} />, "prefixed after purposely set invalid err")
    TestDefs.RequiredTextField.validate = {hide: {create: true}}
    render(<MockedCreate form={form} prefix={prefix} />, "prefixed hidden text")
    TestDefs.RequiredTextField.validate = {hide: {create: false, update: true, find: false}}
    render(<MockedCreate form={form} prefix={prefix} />, "prefixed not hidden in create")
    TestDefs.RequiredTextField.validate = {hide: {create: true, update: false, find: false}}
    render(<MockedCreate form={form} prefix={prefix} />, "prefixed hidden in create")

    FormStore.setValue(TestDefs.RequiredTextField.mapTo, "myText")
    FormStore.setValue(TestDefs.NumberField.mapTo, 420)
    matchStoreState(FormStore, "Before reset on mount")
    render(<MockedCreate form={form} resetOnMount />, "resetOnMount = true")
    matchStoreState(FormStore, "after reset on mount")

    await appRef.cleanUp()
  }, 10000)
}

export default testCreate
