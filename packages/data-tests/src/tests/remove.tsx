import { FormStore } from "@xpfw/form-shared"
import { getRandomApp } from "@xpfw/test-util"
import { FeathersClient } from "@xpfw/ui-feathers"
import { BackendClient, DbStore, ListStore, SharedFormList, SharedFormRemove } from "@xpfw/ui-shared"
import { globals, TestDefs } from "@xpfw/validate"
import { get, isFunction } from "lodash"
import * as React from "react"
import { matchStoreState } from "resub-persist"
import makeMockElement from "../testUtil/baseMock"
import render from "../testUtil/render"
import login from "./login"

BackendClient.client = FeathersClient
globals.options.userIdPath = "id"

const testRemove = (MockEle: any, submitRemove?: any) => {
  test("DbStore Create Test", async () => {
    const form = TestDefs.FormNumberAndRequiredText
    const s: any = form.collection
    const appRef = await getRandomApp(s, false, BackendClient.client, true)
    const MockedRemove = SharedFormRemove(MockEle)
    render(<MockedRemove form={form} />, "before login")
    await login()
    render(<MockedRemove form={form} />, "after login")
    const prefix = "createpref"
    FormStore.setValue(TestDefs.RequiredTextField.mapTo, "myText")
    FormStore.setValue(TestDefs.NumberField.mapTo, 420)
    // render(<MockedEdit form={form} />, "before create")
    const creationRes: any = await DbStore.create(form)
    const ser = appRef.app.service(form.collection)
    const id = creationRes.result.id
    render(<MockedRemove form={form} id={id} />, "remove render")
    expect(await ser.get(id)).toMatchSnapshot("fetch existing resource")
    let resOfRemove
    if (isFunction(submitRemove)) {
      resOfRemove = submitRemove({props: {form, id}})()
    } else {
      resOfRemove = DbStore.remove(id, s)
    }
    render(<MockedRemove form={form} id={id} />, "While removing")
    resOfRemove = await resOfRemove
    expect(resOfRemove).toMatchSnapshot("remove result")
    await expect(ser.get(id)).rejects.toMatchSnapshot("error for not exisiting anymore")
    render(<MockedRemove form={form} id={id} />, "Successfully removed")
    await appRef.cleanUp()
  }, 10000)
}

export default testRemove
