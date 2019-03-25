import { BackendClient, dataOptions, DbStore, ListStore } from "@xpfw/data"
import { FeathersClient } from "@xpfw/data-feathers"
import { makeSubFields, NameField, NumberAndRequiredTextSchema, NumberField } from "@xpfw/form-tests"
import { getRandomApp } from "@xpfw/test-util"
import { isFunction } from "lodash"
import * as React from "react"
import render from "../testUtil/render"
import toJS from "../testUtil/toJS"
import login from "./login"

BackendClient.client = FeathersClient
dataOptions.idPath = "id"

const testList = (MockedList: any, nextPage?: Function, prevPage?: Function) => {
  test("DbStore Create Test", async () => {
    const schema = NumberAndRequiredTextSchema
    const s: any = schema.collection
    const appRef = await getRandomApp(s, false, BackendClient.client, true)
    render(<MockedList schema={schema} />, "before login")
    await login()
    render(<MockedList schema={schema} />, "after login")
    const prefix = "createpref"
    const fields = makeSubFields(NumberAndRequiredTextSchema)
    const defaultList = []
    for (let i = 0; i !== 99; i++) {
      fields[String(NameField.title)].setValue(String(i) + "num")
      fields[String(NumberField.title)].setValue(i * 420)
      const result: any = await DbStore.create(schema)
      if (i % 11 === 0) {
        defaultList.push(result.id)
      }
    }
    fields[String(NumberAndRequiredTextSchema.title)].setValue(undefined)
    render(<MockedList schema={schema} />, "list before fetch")
    await ListStore.getList(schema, undefined, "", true)
    render(<MockedList schema={schema} />, "list after fetch")
    expect(toJS(ListStore)).toMatchSnapshot("after list get")

    await ListStore.nextPage(schema)
    expect(toJS(ListStore)).toMatchSnapshot("after second page get")

    await ListStore.nextPage(schema)
    expect(toJS(ListStore)).toMatchSnapshot("after third page get")
    if (isFunction(nextPage)) {
      await nextPage({props: {schema}})()
    } else {
      await ListStore.nextPage(schema)
    }
    render(<MockedList schema={schema} />, "list on fourth page")
    if (isFunction(prevPage)) {
      await prevPage({props: {schema}})()
    } else {
      await ListStore.prevPage(schema)
    }
    render(<MockedList schema={schema} />, "using prevPage back to third page")

    render(<MockedList prefix={prefix} schema={schema} />, "prefix list before fetch")
    await ListStore.getList(schema, undefined, prefix, true)
    render(<MockedList prefix={prefix} schema={schema} />, "prefix list after fetch")
    expect(toJS(ListStore)).toMatchSnapshot("prefix after list get")

    await ListStore.nextPage(schema, prefix)
    render(<MockedList prefix={prefix} schema={schema} />, "prefix second page")

    await ListStore.nextPage(schema, prefix)
    render(<MockedList prefix={prefix} schema={schema} />, "prefix third page")

    const pre = "newpre"
    const prefixedFields = makeSubFields(NumberAndRequiredTextSchema, pre)
    // prefixedFields[String(NumberField.title)].setValue(undefined)
    prefixedFields[String(NameField.title)].setValue("1num")
    await ListStore.getList(schema, undefined, pre, true)
    render(<MockedList prefix={pre} schema={schema} />, "prefix still first if prefix unknown but query set")
    prefixedFields[String(NumberField.title)].setValue(840)
    prefixedFields[String(NameField.title)].setValue(undefined)
    console.log("search res is", await ListStore.getList(schema, undefined, "newpre", true))
    // TODO: find out why number query does not work here
    render(<MockedList prefix={pre} schema={schema} />, "prefix still first if prefix unknown but query number")

    prefixedFields[String(NameField.title)].setValue("UNDEFINEDAAA")
    console.log("empty search res is", await ListStore.getList(schema, undefined, "newpre", true))
    render(<MockedList prefix={pre} schema={schema} />, "empty result")
    render(<MockedList prefix={pre} schema={schema} defaultEntries={defaultList} />, "empty result with defaultVals but not fetched yet")
    for (const entry in defaultList) {
      await DbStore.getFromServer(entry, s)
    }
    render(<MockedList prefix={pre} schema={schema} defaultEntries={defaultList} />, "empty result with defaultVals with guaranteed fetch")
    schema.collection = "broken"
    const errRes = await ListStore.getList(schema, undefined, "asdf", true)
    expect(errRes.error).not.toBeNull()
    expect(errRes.result).toBe(undefined)
    await appRef.cleanUp()
  }, 10000)
}

export default testList
