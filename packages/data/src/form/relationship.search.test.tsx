import { ComponentRegistry, FormStore, SharedField } from "@xpfw/form-shared"
import { getRandomApp } from "@xpfw/test-util"
import { FeathersClient } from "@xpfw/ui-feathers"
import { FieldType, TestDefs,  ValidationRegistry } from "@xpfw/validate"
import "isomorphic-fetch"
import * as render from "preact-render-to-json"
import * as React from "react"
import BackendClient from "../client"
import { submitCreate } from "../components/create"
import SharedFormList from "../components/list"
import DbStore from "../store/db"
import makeMockElement from "../testUtil/makeMockElement"
import RelationShipWrapper, { addId, getListFormFromRelationshipField, removeId, searchRelated } from "./relationship"

BackendClient.client = FeathersClient

test("Relationship searching Test", async () => {
  const form = TestDefs.FormNumberAndRequiredText
  const s: any = [TestDefs.FormNumberAndRequiredText.collection, TestDefs.FormRelationshipToNumAndRequiredText.collection]
  const relationCol: any = TestDefs.FormNumberAndRequiredText.collection
  const appRef = await getRandomApp(s, true, BackendClient.client, false, {convertIds: true})
  TestDefs.FormNumberAndRequiredText.options = {idPath: "_id", filterOutById: true}
  TestDefs.FormRelationshipToNumAndRequiredText.options = {idPath: "_id", filterOutById: true}
  ValidationRegistry.registerForm(TestDefs.FormNumberAndRequiredText)
  ValidationRegistry.registerForm(TestDefs.FormRelationshipToNumAndRequiredText)
  const MockEle: any = makeMockElement("show",
    ["list.result", "queryData._id.$nin", "queryData.customPre._id.$nin"])
  const MockedRelationship = RelationShipWrapper(MockEle)
  ComponentRegistry.registerComponent(FieldType.RelationshipSingle, MockedRelationship)
  ComponentRegistry.registerComponent(FieldType.RelationshipMulti, MockedRelationship)
  const createdEles: any = []
  for (let i = 0; i < 10; i++) {
    FormStore.setValue(TestDefs.RequiredTextField.mapTo, "my " + (i % 2 === 0 ? " iText " : "null") + i)
    FormStore.setValue(TestDefs.NumberField.mapTo, 420 + i)
    createdEles.push(await submitCreate({props: {form}})())
  }
  await DbStore.getFromServer(createdEles[1].result.id, relationCol)

  // Multi
  const prefixes = ["", "customPre"]
  for (const prefix of prefixes) {
    expect(render(<SharedField field={TestDefs.RelationshipMultiField} />)).toMatchSnapshot("nothing yet")
    const thisRef: any = {props: {field: TestDefs.RelationshipMultiField, prefix}}
    const boundSearchRelated = searchRelated(thisRef)
    const searchForm = getListFormFromRelationshipField(TestDefs.RelationshipMultiField)
    const MockedList = SharedFormList(MockEle)
    const mySearch = await boundSearchRelated("my")
    expect(render(<SharedField field={TestDefs.RelationshipMultiField} />)).toMatchSnapshot(prefix + "search for my")
    expect(render(<MockedList prefix={prefix} form={searchForm} />)).toMatchSnapshot(prefix + "list search for my")
    await boundSearchRelated("Text")
    expect(render(<SharedField field={TestDefs.RelationshipMultiField} />)).toMatchSnapshot(prefix + "search for Text")
    expect(render(<MockedList prefix={prefix} form={searchForm} />)).toMatchSnapshot(prefix + "list search for Text")
    await boundSearchRelated("null")
    expect(render(<SharedField field={TestDefs.RelationshipMultiField} />)).toMatchSnapshot(prefix + "search for null")
    expect(render(<MockedList prefix={prefix} form={searchForm} />)).toMatchSnapshot(prefix + "list search for null")
    const val = createdEles[0].result._id
    FormStore.setValue(
      `${prefix && prefix.length > 0 ? prefix + "." : ""}${TestDefs.RelationshipMultiField.mapTo}`,
      val)
    thisRef.props.value = val
    const filteredSearch = await boundSearchRelated("my")
    FormStore.setValue(
      `${prefix && prefix.length > 0 ? prefix + "." : ""}${TestDefs.RelationshipMultiField.mapTo}`,
      undefined)
    expect(render(<SharedField field={TestDefs.RelationshipMultiField} />))
      .toMatchSnapshot(prefix + "search for my but one value should be excluded")
    expect(render(<MockedList prefix={prefix} form={searchForm} />))
      .toMatchSnapshot(prefix + "list search for my but one value should be excluded")

  }
  await appRef.cleanUp()
}, 10000)
