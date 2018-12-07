import { TestDefs } from "@xpfw/validate"
import { set } from "lodash"
import * as render from "preact-render-to-json"
import * as React from "react"
import ComponentRegistry from "../componentRegistry"
import SharedField, { setValueWrap } from "../components/field"
import FormStore from "../store/form"
import baseComponentMocks, {makeMockElement} from "../testUtil/baseMock"

test("Basic Fields Test", () => {
  baseComponentMocks()
  const n: any = null
  expect(render(<SharedField field={n} />))
    .toMatchSnapshot("empty render")
  expect(render(<SharedField field={TestDefs.NameFieldPublic} />))
    .toMatchSnapshot("namefield")
  FormStore.setValue(TestDefs.NameFieldPublic.mapTo, "myval")
  expect(render(<SharedField field={TestDefs.NameFieldPublic} />))
    .toMatchSnapshot("namefield changed val")
  setValueWrap({props: {
    field: TestDefs.NameFieldPublic, form: TestDefs.FormNumberAndRequiredText
  }})("setviavaluewrap")
  expect(render((
    <SharedField
      field={TestDefs.NameFieldPublic}
      form={TestDefs.FormNumberAndRequiredText}
      theme="test"
    />
  ))).toMatchSnapshot("unfindable themed component fallsback to default")
  const newComp: any = makeMockElement("mocktest")
  ComponentRegistry.registerComponent(TestDefs.NameFieldPublic.type, newComp, "test")
  expect(render((
    <SharedField
      field={TestDefs.NameFieldPublic}
      form={TestDefs.FormNumberAndRequiredText}
      theme="test"
    />
  ))).toMatchSnapshot("use themed component")
  set(TestDefs.NameFieldPublic, "validate.defaultValue", "myDefaultTEXTS")
  FormStore.setValue(TestDefs.NameFieldPublic.mapTo, "THIS AINT THE DEFAULT VAL YO!")
  expect(render((
    <SharedField
      field={TestDefs.NameFieldPublic}
      form={TestDefs.FormNumberAndRequiredText}
      theme="test"
    />
  ))).toMatchSnapshot("render field with default component and value already set")
  FormStore.setValue(TestDefs.NameFieldPublic.mapTo, undefined)
  expect(render((
    <SharedField
      field={TestDefs.NameFieldPublic}
      form={TestDefs.FormNumberAndRequiredText}
      theme="test"
    />
  ))).toMatchSnapshot("field updated to default value because no value set")
})
