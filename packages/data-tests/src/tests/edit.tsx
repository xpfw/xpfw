import { BackendClient, dataOptions, DbStore, UserStore } from "@xpfw/data"
import { FeathersClient } from "@xpfw/data-feathers"
import { FormStore, prependPrefix } from "@xpfw/form"
import { makeSubFields, NameField, NumberAndRequiredTextSchema, NumberField } from "@xpfw/form-tests"
import { getRandomApp } from "@xpfw/test-util"
import { get, isFunction } from "lodash"
import * as React from "react"
import render from "../testUtil/render"
import toJS from "../testUtil/toJS"
import login from "./login"

BackendClient.client = FeathersClient
dataOptions.idPath = "id"
const testEdit = (MockedEdit: any, submitEdit?: Function) => {
  test("DbStore Edit Test", async () => {
    const u: any = DbStore
    const schema = NumberAndRequiredTextSchema
    const s: any = schema.collection
    const appRef = await getRandomApp(s, false, BackendClient.client, true, {userStore: UserStore})
    // render(<MockedEdit schema={schema} />, "before login")
    await login()
    // render(<MockedEdit schema={schema} />, "after login")
    const fields = makeSubFields(NumberAndRequiredTextSchema)
    fields[String(NameField.title)].setValue("myText")
    fields[String(NumberField.title)].setValue(420)
    // render(<MockedEdit schema={schema} />, "before create")
    const creationRes = await DbStore.create(schema)
    fields[String(NumberAndRequiredTextSchema.title)].setValue(undefined)
    expect(toJS(FormStore)).toMatchSnapshot("before set by getorig")
    const id = get(creationRes, "id")
    const editFetchRes = await DbStore.getEditOriginal(id, schema, undefined, undefined, true)
    expect(editFetchRes).toMatchSnapshot("result of edit fetch")
    expect(toJS(DbStore)).toMatchSnapshot("After create and geteditorig")
    expect(toJS(FormStore)).toMatchSnapshot("after edit getorig")
    render(<MockedEdit schema={schema} id={id} />, "after create")
    fields[String(NameField.title)].setValue("changed")
    fields[String(NumberField.title)].setValue(240)
    expect(toJS(DbStore)).toMatchSnapshot("Before submit patch")
    expect(toJS(FormStore)).toMatchSnapshot("Before submit patch")
    if (isFunction(submitEdit)) {
      await submitEdit(id, schema)()
    } else {
      await DbStore.patch(id, schema)
    }
    expect(toJS(DbStore)).toMatchSnapshot("after submitted patch")
    u.lastFetch = {}
    u.getState = {}
    expect(toJS(await DbStore.getFromServer(id, s))).toMatchSnapshot("updated record")
    render(<MockedEdit schema={schema} id={id} />, "after successfull save")
    u.updateState[String(schema.title)] = undefined
    FormStore.setError(`${String(schema.title)}${id}`, {got: "err"})
    render(<MockedEdit schema={schema} id={id} />, "after purposely set invalid err")
    FormStore.setLoading(`${String(schema.title)}${id}`, true)
    render(<MockedEdit schema={schema} id={id} />, "while loading")
    FormStore.setLoading(`${String(schema.title)}${id}`, false)

    // WITH PREFIX
    const prefix = "editPrefix"

    fields[String(NameField.title)].setValue("secondOBJ")
    fields[String(NumberField.title)].setValue(24)
    // render(<MockedEdit schema={schema} />, "before create")
    const secondCreateRes = await DbStore.create(schema)
    fields[String(NumberAndRequiredTextSchema.title)].setValue(undefined)
    expect(toJS(FormStore)).toMatchSnapshot("prefix before set by getorig")
    const secondId = get(secondCreateRes, "id")
    const secondEditFetchRes = await DbStore.getEditOriginal(secondId, schema, undefined, undefined, true)
    expect(secondEditFetchRes).toMatchSnapshot("prefix result of edit fetch")
    expect(toJS(DbStore)).toMatchSnapshot("prefix After create and geteditorig")
    expect(toJS(FormStore)).toMatchSnapshot("prefix after edit getorig")
    render(<MockedEdit schema={schema} id={secondId} prefix={prefix} />, "prefix after create")

    const prefixedFIelds = makeSubFields(NumberAndRequiredTextSchema)
    prefixedFIelds[String(NameField.title)].setValue("SECOND change")
    prefixedFIelds[String(NumberField.title)].setValue(6543)
    expect(toJS(DbStore)).toMatchSnapshot("prefix Before submit patch")
    if (isFunction(submitEdit)) {
      await submitEdit(secondId , schema, undefined, prefix)()
    } else {
      await DbStore.patch(secondId, schema, prefix)
    }
    expect(toJS(DbStore)).toMatchSnapshot("prefix after submitted patch")
    expect(toJS(await DbStore.getFromServer(secondId, s))).toMatchSnapshot("prefix updated record")
    render(<MockedEdit schema={schema} id={secondId} prefix={prefix} />, "prefix after successfull save")
    u.updateState[prependPrefix(String(schema.title), prefix)] = undefined
    FormStore.setError(`${prefix}.${String(schema.title)}${secondId}`, {got: "err"})
    render(<MockedEdit schema={schema} id={secondId} prefix={prefix} />, "prefix after purposely set invalid err")
    FormStore.setLoading(`${prefix}.${String(schema.title)}${secondId}`, true)
    render(<MockedEdit schema={schema} id={secondId} prefix={prefix} />, "prefix while loading")
    FormStore.setLoading(`${prefix}.${String(schema.title)}${secondId}`, false)

    await DbStore.getEditOriginal("lala", schema, undefined, undefined, true)
    NameField.hide = {create: true}
    render(<MockedEdit schema={schema} id={id} />, "hidden text")
    NameField.hide = {create: true, update: false, find: false}
    render(<MockedEdit schema={schema} id={id} />, "not hidden in update")
    NameField.hide = {create: false, update: true, find: false}
    render(<MockedEdit schema={schema} id={id} />, "hidden in update")

    render(<MockedEdit schema={schema} id={id} reset />, "resetOnMount")

    await appRef.cleanUp()
  }, 10000)
}

export default testEdit
