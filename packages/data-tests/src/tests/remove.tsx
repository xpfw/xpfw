import { BackendClient, dataOptions, DbStore } from "@xpfw/data"
import { FeathersClient } from "@xpfw/data-feathers"
import { makeSubFields, NameField, NumberAndRequiredTextSchema, NumberField } from "@xpfw/form-tests"
import { getRandomApp } from "@xpfw/test-util"
import { get, isFunction } from "lodash"
import * as React from "react"
import render from "../testUtil/render"
import login from "./login"

BackendClient.client = FeathersClient
dataOptions.idPath = "id"

const testRemove = (MockedRemove: any, submitRemove?: any) => {
  test("DbStore Create Test", async () => {
    const schema = NumberAndRequiredTextSchema
    const s: any = schema.collection
    const appRef = await getRandomApp(s, false, BackendClient.client, true)
    render(<MockedRemove schema={schema} />, "before login")
    await login()
    render(<MockedRemove schema={schema} />, "after login")
    const prefix = "createpref"
    const fields = makeSubFields(NumberAndRequiredTextSchema)
    fields[String(NameField.title)].setValue("myText")
    fields[String(NumberField.title)].setValue(420)
    // render(<MockedEdit schema={schema} />, "before create")
    const creationRes: any = await DbStore.create(schema)
    const ser = appRef.app.service(schema.collection)
    const id = creationRes.id
    render(<MockedRemove schema={schema} id={id} />, "remove render")
    expect(await ser.get(id)).toMatchSnapshot("fetch existing resource")
    let resOfRemove
    if (isFunction(submitRemove)) {
      resOfRemove = submitRemove(id, schema)()
    } else {
      resOfRemove = DbStore.remove(id, s)
    }
    render(<MockedRemove schema={schema} id={id} />, "While removing")
    resOfRemove = await resOfRemove
    expect(resOfRemove).toMatchSnapshot("remove result")
    await expect(ser.get(id)).rejects.toMatchSnapshot("error for not exisiting anymore")
    render(<MockedRemove schema={schema} id={id} />, "Successfully removed")
    await appRef.cleanUp()
  }, 10000)
}

export default testRemove
