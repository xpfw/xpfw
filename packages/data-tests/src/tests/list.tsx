import { FormStore } from "@xpfw/form-shared"
import { getRandomApp } from "@xpfw/test-util"
import { FeathersClient } from "@xpfw/ui-feathers"
import { BackendClient, DbStore, ListStore, SharedFormList } from "@xpfw/ui-shared"
import { globals, TestDefs } from "@xpfw/validate"
import { get, isFunction } from "lodash"
import * as React from "react"
import { matchStoreState } from "resub-persist"
import makeMockElement from "../testUtil/baseMock"
import render from "../testUtil/render"
import login from "./login"

BackendClient.client = FeathersClient
globals.options.userIdPath = "id"

const testList = (MockEle: any, nextPage?: Function, prevPage?: Function, onUpdate?: Function) => {
  test("DbStore Create Test", async () => {
    const form = TestDefs.FormNumberAndRequiredText
    const s: any = form.collection
    const appRef = await getRandomApp(s, false, BackendClient.client, true)
    const MockedList = SharedFormList(MockEle)
    render(<MockedList form={form} />, "before login")
    await login()
    render(<MockedList form={form} />, "after login")
    const prefix = "createpref"
    const defaultList = []
    for (let i = 0; i !== 99; i++) {
      FormStore.setValue(TestDefs.RequiredTextField.mapTo, String(i) + "num")
      FormStore.setValue(TestDefs.NumberField.mapTo, i * 420)
      const result: any = await DbStore.create(form)
      if (i % 11 === 0) {
        defaultList.push(result.result.id)
      }
    }
    FormStore.setValue(TestDefs.NumberField.mapTo, undefined)
    FormStore.setValue(TestDefs.RequiredTextField.mapTo, undefined)
    render(<MockedList form={form} />, "list before fetch")
    await ListStore.getList(form.model, form, "", true)
    render(<MockedList form={form} />, "list after fetch")
    expect(toJS(ListStore)).toMatchSnapshot("after list get")

    await ListStore.nextPage(form)
    expect(toJS(ListStore)).toMatchSnapshot("after second page get")

    await ListStore.nextPage(form)
    expect(toJS(ListStore)).toMatchSnapshot("after third page get")
    if (isFunction(nextPage)) {
      await nextPage({props: {form}})()
    } else {
      await ListStore.nextPage(form)
    }
    render(<MockedList form={form} />, "list on fourth page")
    if (isFunction(prevPage)) {
      await prevPage({props: {form}})()
    } else {
      await ListStore.prevPage(form)
    }
    render(<MockedList form={form} />, "using prevPage back to third page")
    if (isFunction(onUpdate)) {
      FormStore.setValue(TestDefs.RequiredTextField.mapTo, null)
      const upThisRef: any = {props: {form}, state: {}}
      upThisRef.setState = (newState: any) => {
        upThisRef.state = newState
      }
      await onUpdate(upThisRef)()
      render(<MockedList form={form} />, "changing value manually but onUpdate detects changes no query")
      console.log("result is", await ListStore.makeQuery(form))
      render(<MockedList form={form} />, "changing value manually but onUpdate detects changes no query loaded")
      FormStore.setValue(TestDefs.RequiredTextField.mapTo, "9num")
      await ListStore.makeQuery(form)
      await onUpdate(upThisRef)()
      render(<MockedList form={form} />, "changing value manually but onUpdate detects changes now loading")
      await ListStore.makeQuery(form)
      render(<MockedList form={form} />, "changing value manually but onUpdate detects changes loaded narrowing search")
      FormStore.setValue(TestDefs.RequiredTextField.mapTo, null)
    }

    render(<MockedList prefix={prefix} form={form} />, "prefix list before fetch")
    await ListStore.getList(form.model, form, prefix, true)
    render(<MockedList prefix={prefix} form={form} />, "prefix list after fetch")
    expect(toJS(ListStore)).toMatchSnapshot("prefix after list get")

    await ListStore.nextPage(form, prefix)
    render(<MockedList prefix={prefix} form={form} />, "prefix second page")

    await ListStore.nextPage(form, prefix)
    render(<MockedList prefix={prefix} form={form} />, "prefix third page")
    FormStore.setValue(TestDefs.NumberField.mapTo, undefined)
    FormStore.setValue(TestDefs.RequiredTextField.mapTo, undefined)
    FormStore.setValue("newpre." + TestDefs.NumberField.mapTo, undefined)
    FormStore.setValue("newpre." + TestDefs.RequiredTextField.mapTo, "1num")
    await ListStore.getList(form.model, form, "newpre", true)
    render(<MockedList prefix={"newpre"} form={form} />, "prefix still first if prefix unknown but query set")
    FormStore.setValue("newpre." + TestDefs.NumberField.mapTo, 840)
    FormStore.setValue("newpre." + TestDefs.RequiredTextField.mapTo, undefined)
    console.log("search res is", await ListStore.getList("newpre." + form.model, form, "newpre", true))
    // TODO: find out why number query does not work here
    render(<MockedList prefix={"newpre"} form={form} />, "prefix still first if prefix unknown but query number")
    FormStore.setValue("newpre." + TestDefs.RequiredTextField.mapTo, "UNDEFINEDAAA")
    console.log("empty search res is", await ListStore.getList("newpre." + form.model, form, "newpre", true))
    render(<MockedList prefix={"newpre"} form={form} />, "empty result")
    render(<MockedList prefix={"newpre"} form={form} defaultEntries={defaultList} />, "empty result with defaultVals but not fetched yet")
    for (const entry in defaultList) {
      await DbStore.getFromServer(entry, s)
    }
    render(<MockedList prefix={"newpre"} form={form} defaultEntries={defaultList} />, "empty result with defaultVals with guaranteed fetch")
    form.collection = "broken"
    const errRes = await ListStore.getList("asdf", form, undefined, true)
    expect(errRes.error).not.toBeNull()
    expect(errRes.result).toBe(undefined)
    await appRef.cleanUp()
  }, 10000)
}

export default testList
