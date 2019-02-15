import { FormStore } from "@xpfw/form-shared"
import { getRandomApp } from "@xpfw/test-util"
import { FeathersClient } from "@xpfw/ui-feathers"
import { BackendClient, DbStore, SharedFormRemove } from "@xpfw/ui-shared"
import { globals, TestDefs } from "@xpfw/validate"
import { get, isFunction } from "lodash"
import * as React from "react"
import render from "../testUtil/render"
import login from "./login"

BackendClient.client = FeathersClient
globals.options.userIdPath = "id"

const testShow = (MockedShow: any, submitRemove?: any) => {
  test("DbStore show Test", async () => {
    const form = TestDefs.FormNumberAndRequiredText
    const s: any = form.collection
    const appRef = await getRandomApp(s, false, BackendClient.client, true)
    render(<MockedShow collection={form.collection} />, "before login")
    await login()
    render(<MockedShow collection={form.collection} />, "after login")
    const prefix = "createpref"
    FormStore.setValue(TestDefs.RequiredTextField.mapTo, "myText")
    FormStore.setValue(TestDefs.NumberField.mapTo, 420)
    // render(<MockedEdit form={form} />, "before create")
    const creationRes: any = await DbStore.create(form)
    const ser = appRef.app.service(form.collection)
    const id = creationRes.result.id
    render(<MockedShow collection={form.collection} id={id} />, "remove render")
    expect(await ser.get(id)).toMatchSnapshot("fetch existing resource")
    let resOfRemove
    if (isFunction(submitRemove)) {
      resOfRemove = submitRemove({props: {form, id}})()
    } else {
      resOfRemove = DbStore.remove(id, s)
    }
    render(<MockedShow collection={form.collection} id={id} />, "While removing")
    resOfRemove = await resOfRemove
    expect(resOfRemove).toMatchSnapshot("remove result")
    await expect(ser.get(id)).rejects.toMatchSnapshot("error for not exisiting anymore")
    render(<MockedShow collection={form.collection} id={id} />, "Successfully removed")
    await appRef.cleanUp()
  }, 10000)
}

export default testShow
