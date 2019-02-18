import { BackendClient, dataOptions, DbStore  } from "@xpfw/data"
import { FeathersClient } from "@xpfw/data-feathers"
import { FormStore } from "@xpfw/form"
import { makeSubFields, NameField, NumberAndRequiredTextSchema, NumberField } from "@xpfw/form-tests"
import { getRandomApp } from "@xpfw/test-util"
import { get, isFunction } from "lodash-es"
import * as React from "react"
import render from "../testUtil/render"
import toJS from "../testUtil/toJS"
import login from "./login"

BackendClient.client = FeathersClient
dataOptions.idPath = "id"

const testCreate = (MockedCreate: any, submitCreate?: Function) => {
  test("DbStore Create Test", async () => {
    const schema = NumberAndRequiredTextSchema
    const s: any = schema.collection
    const appRef = await getRandomApp(s, false, BackendClient.client, true)
    const prefix = "createpref"
    const fields = makeSubFields(NumberAndRequiredTextSchema)
    render(<MockedCreate schema={schema} />, "before login")
    await login()
    render(<MockedCreate schema={schema} />, "after login")
    fields[String(NameField.title)].setValue("myText")
    fields[String(NumberField.title)].setValue(420)
    render(<MockedCreate schema={schema} />, "before create")
    if (isFunction(submitCreate)) {
      await submitCreate(schema)()
    } else {
      await DbStore.create(schema)
    }
    render(<MockedCreate schema={schema} />, "after create")
    FormStore.setLoading(String(schema.title), true)
    render(<MockedCreate schema={schema} />, "while loading")
    FormStore.setLoading(String(schema.title), false)
    const u: any = DbStore
    u.createState[String(schema.title)] = undefined
    FormStore.setError(String(schema.title), {errors: ["a", "b"]})
    render(<MockedCreate schema={schema} />, "after purposely set invalid err")
    NameField.hide = {create: true}
    render(<MockedCreate schema={schema} />, "hidden text")
    NameField.hide = {create: false, update: true, find: false}
    render(<MockedCreate schema={schema} />, "not hidden in create")
    NameField.hide = {create: true, update: false, find: false}
    render(<MockedCreate schema={schema} />, "hidden in create")

    fields[String(NameField.title)].setValue("myText")
    fields[String(NumberField.title)].setValue(420)
    expect(toJS(FormStore)).toMatchSnapshot("Before reset on mount")
    render(<MockedCreate schema={schema} reset />, "resetOnMount = true")
    expect(toJS(FormStore)).toMatchSnapshot("after reset on mount")

    // WITH PREFIX

    render(<MockedCreate schema={schema} prefix={prefix} />, "prefixed before create")

    const prefixedFields = makeSubFields(NumberAndRequiredTextSchema, undefined, prefix)
    prefixedFields[String(NameField.title)].setValue("SECOND OBJECT")
    prefixedFields[String(NumberField.title)].setValue(421)
    if (isFunction(submitCreate)) {
      await submitCreate(schema, undefined, prefix)()
    } else {
      await DbStore.create(schema, prefix)
    }
    render(<MockedCreate schema={schema} prefix={prefix} />, "prefixed after create")
    FormStore.setLoading(String(schema.title), true)
    render(<MockedCreate schema={schema} prefix={prefix} />, "prefixed while loading")
    FormStore.setLoading(String(schema.title), false)
    u.createState[`${prefix}.${String(schema.title)}`] = undefined
    FormStore.setError(`${prefix}.${String(schema.title)}`, {errors: ["a", "b"]})
    render(<MockedCreate schema={schema} prefix={prefix} />, "prefixed after purposely set invalid err")
    NameField.hide = {create: true}
    render(<MockedCreate schema={schema} prefix={prefix} />, "prefixed hidden text")
    NameField.hide = {create: false, update: true, find: false}
    render(<MockedCreate schema={schema} prefix={prefix} />, "prefixed not hidden in create")
    NameField.hide = {create: true, update: false, find: false}
    render(<MockedCreate schema={schema} prefix={prefix} />, "prefixed hidden in create")

    fields[String(NameField.title)].setValue("myText")
    fields[String(NumberField.title)].setValue(420)
    expect(toJS(FormStore)).toMatchSnapshot("Before reset on mount")
    render(<MockedCreate schema={schema} reset />, "resetOnMount = true")
    expect(toJS(FormStore)).toMatchSnapshot("after reset on mount")

    await appRef.cleanUp()
  }, 10000)
}

export default testCreate
