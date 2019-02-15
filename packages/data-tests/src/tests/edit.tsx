import { FormErrorStore, FormStore, LoadingStore } from "@xpfw/form-shared"
import { getRandomApp } from "@xpfw/test-util"
import { FeathersClient } from "@xpfw/ui-feathers"
import { BackendClient, DbStore, SharedFormEdit, UserStore } from "@xpfw/ui-shared"
import { globals, TestDefs } from "@xpfw/validate"
import { get, isFunction } from "lodash"
import * as React from "react"
import { matchStoreState } from "resub-persist"
import makeMockElement from "../testUtil/baseMock"
import render from "../testUtil/render"
import login from "./login"

BackendClient.client = FeathersClient
globals.options.userIdPath = "id"

const testEdit = (MockEle: any, submitEdit?: Function) => {
  test("DbStore Edit Test", async () => {
    const form = TestDefs.FormNumberAndRequiredText
    const s: any = form.collection
    const appRef = await getRandomApp(s, false, BackendClient.client, true, {userStore: UserStore})
    const MockedEdit = SharedFormEdit(MockEle)
    // render(<MockedEdit form={form} />, "before login")
    await login()
    // render(<MockedEdit form={form} />, "after login")
    FormStore.setValue(TestDefs.RequiredTextField.mapTo, "myText")
    FormStore.setValue(TestDefs.NumberField.mapTo, 420)
    // render(<MockedEdit form={form} />, "before create")
    const creationRes = await DbStore.create(form)
    FormStore.setValue(TestDefs.RequiredTextField.mapTo, null)
    FormStore.setValue(TestDefs.NumberField.mapTo, null)
    matchStoreState(FormStore, "before set by getorig")
    const id = get(creationRes, "result.id")
    const editFetchRes = await DbStore.getEditOriginal(id, form,
      undefined, true)
    expect(editFetchRes).toMatchSnapshot("result of edit fetch")
    matchStoreState(DbStore, "After create and geteditorig")
    matchStoreState(FormStore, "after edit getorig")
    render(<MockedEdit form={form} id={id} />, "after create")
    FormStore.setValue(TestDefs.RequiredTextField.mapTo, "changed")
    FormStore.setValue(TestDefs.NumberField.mapTo, 240)
    matchStoreState(DbStore, "Before submit patch")
    if (isFunction(submitEdit)) {
      await submitEdit({
        props: {
          form, id
        }
      })()
    } else {
      await DbStore.patch(id, form)
    }
    matchStoreState(DbStore, "after submitted patch")
    expect(await DbStore.getFromServer(id, s)).toMatchSnapshot("updated record")
    render(<MockedEdit form={form} id={id} />, "after successfull save")
    DbStore.setUpdateState(form.model, undefined)
    FormErrorStore.setError(`${id}${form.model}`, {errors: ["a", "b"]})
    render(<MockedEdit form={form} id={id} />, "after purposely set invalid err")
    LoadingStore.setLoading(`${id}${form.model}`, true)
    render(<MockedEdit form={form} id={id} />, "while loading")
    LoadingStore.setLoading(`${id}${form.model}`, false)

    // WITH PREFIX
    const prefix = "editPrefix"

    FormStore.setValue(TestDefs.RequiredTextField.mapTo, "secondOBJ")
    FormStore.setValue(TestDefs.NumberField.mapTo, 24)
    // render(<MockedEdit form={form} />, "before create")
    const secondCreateRes = await DbStore.create(form)
    FormStore.setValue(TestDefs.RequiredTextField.mapTo, null)
    FormStore.setValue(TestDefs.NumberField.mapTo, null)
    matchStoreState(FormStore, "prefix before set by getorig")
    const secondId = get(secondCreateRes, "result.id")
    const secondEditFetchRes = await DbStore.getEditOriginal(secondId, form,
      undefined, true)
    expect(secondEditFetchRes).toMatchSnapshot("prefix result of edit fetch")
    matchStoreState(DbStore, "prefix After create and geteditorig")
    matchStoreState(FormStore, "prefix after edit getorig")
    render(<MockedEdit form={form} id={secondId} prefix={prefix} />, "prefix after create")
    FormStore.setValue(`${prefix}.${TestDefs.RequiredTextField.mapTo}`, "SECOND change")
    FormStore.setValue(`${prefix}.${TestDefs.NumberField.mapTo}`, 6543)
    matchStoreState(DbStore, "prefix Before submit patch")
    if (isFunction(submitEdit)) {
      await submitEdit({
        props: {
          form, id: secondId, prefix
        }
      })()
    } else {
      await DbStore.patch(secondId, form, prefix)
    }
    matchStoreState(DbStore, "prefix after submitted patch")
    expect(await DbStore.getFromServer(secondId, s)).toMatchSnapshot("prefix updated record")
    render(<MockedEdit form={form} id={secondId} prefix={prefix} />, "prefix after successfull save")
    DbStore.setUpdateState(form.model, undefined)
    FormErrorStore.setError(`${prefix}.${secondId}${form.model}`, {errors: ["a", "b"]})
    render(<MockedEdit form={form} id={secondId} prefix={prefix} />, "prefix after purposely set invalid err")
    LoadingStore.setLoading(`${prefix}.${secondId}${form.model}`, true)
    render(<MockedEdit form={form} id={secondId} prefix={prefix} />, "prefix while loading")
    LoadingStore.setLoading(`${prefix}.${secondId}${form.model}`, false)

    await DbStore.getEditOriginal("lala", form,
      undefined, true)
    TestDefs.RequiredTextField.validate = {hide: {create: true}}
    render(<MockedEdit form={form} id={id} />, "hidden text")
    TestDefs.RequiredTextField.validate = {hide: {create: true, update: false, find: false}}
    render(<MockedEdit form={form} id={id} />, "not hidden in update")
    TestDefs.RequiredTextField.validate = {hide: {create: false, update: true, find: false}}
    render(<MockedEdit form={form} id={id} />, "hidden in update")

    render(<MockedEdit form={form} id={id} resetOnMount />, "resetOnMount")

    await appRef.cleanUp()
  }, 10000)
}

export default testEdit
