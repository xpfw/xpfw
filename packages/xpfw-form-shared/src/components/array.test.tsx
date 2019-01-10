import { FieldType, TestDefs } from "@xpfw/validate"
import { get } from "lodash"
import * as render from "preact-render-to-json"
import * as React from "react"
import { increaseSize, removeItem } from "../components/array"
import SharedField from "../components/field"
import FormStore from "../store/form"
import baseComponentMocks, {makeMockElement} from "../testUtil/baseMock"
test("Basic Fields Test", () => {
  baseComponentMocks()
  const field = get(TestDefs, "TextArrayField", {
    mapTo: "myArray",
    type: FieldType.Array,
    validate: {
      type: FieldType.Text
    }
  })
  const refMaker = (value: any) => {
    return {
      props: {
        value,
        setValue: (newVal: any) => FormStore.setValue(field.mapTo, newVal)
      }
    }
  }
  expect(render(<SharedField field={field} />))
    .toMatchSnapshot("unchanged render")
  FormStore.setValue(field.mapTo, [",", ",asdf ", "asdf"])
  expect(render(<SharedField field={field} />))
    .toMatchSnapshot("got three values")
  increaseSize(refMaker(FormStore.getValue(field.mapTo)))()
  expect(render(<SharedField field={field} />))
    .toMatchSnapshot("increased size to four")
  removeItem(refMaker(FormStore.getValue(field.mapTo)))(2)()
  expect(render(<SharedField field={field} />))
    .toMatchSnapshot("removed second item")
  FormStore.setValue(field.mapTo, [",", ",asdf ", "asdf"])
  increaseSize(refMaker(FormStore.getValue(field.mapTo)))(2)
  expect(render(<SharedField field={field} />))
  .toMatchSnapshot("increased size to four By inserting at 2")
  FormStore.setValue(field.mapTo, [",", ",asdf ", "asdf"])
  removeItem(refMaker(FormStore.getValue(field.mapTo)))(1)()
  expect(render(<SharedField field={field} />))
  .toMatchSnapshot("removed Index one item")
  removeItem(refMaker(FormStore.getValue(field.mapTo)))(0)()
  expect(render(<SharedField field={field} />))
    .toMatchSnapshot("removed Index zero item")
})
