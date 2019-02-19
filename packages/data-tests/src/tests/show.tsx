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

const testShow = (MockedShow: any, submitRemove?: any) => {
  test("DbStore show Test", async () => {
    const schema = NumberAndRequiredTextSchema
    const s: any = schema.collection
    const appRef = await getRandomApp(s, false, BackendClient.client, true)
    render(<MockedShow collection={schema.collection} />, "before login")
    await login()
    render(<MockedShow collection={schema.collection} />, "after login")
    const prefix = "createpref"
    const fields = makeSubFields(NumberAndRequiredTextSchema)
    fields[String(NameField.title)].setValue("myText")
    fields[String(NumberField.title)].setValue(420)
    // render(<MockedEdit schema={schema} />, "before create")
    const creationRes: any = await DbStore.create(schema)
    const ser = appRef.app.service(schema.collection)
    const id = creationRes.id
    render(<MockedShow collection={schema.collection} id={id} />, "not yet fetched but still there because created")
    expect(await ser.get(id)).toMatchSnapshot("fetch existing resource")
    render(<MockedShow collection={schema.collection} id={id} />, "after definitely fetched")
    let resOfRemove
    if (isFunction(submitRemove)) {
      resOfRemove = submitRemove(id, schema)()
    } else {
      resOfRemove = DbStore.remove(id, s)
    }
    render(<MockedShow collection={schema.collection} id={id} />, "While removing")
    resOfRemove = await resOfRemove
    expect(resOfRemove).toMatchSnapshot("remove result")
    await expect(ser.get(id)).rejects.toMatchSnapshot("error for not exisiting anymore")
    render(<MockedShow collection={schema.collection} id={id} />, "Successfully removed")
    await appRef.cleanUp()
  }, 10000)
}

export default testShow
