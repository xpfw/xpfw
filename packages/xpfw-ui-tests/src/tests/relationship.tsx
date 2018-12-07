import { FormStore, SharedField } from "@xpfw/form-shared"
import { getRandomApp } from "@xpfw/test-util"
import { FeathersClient } from "@xpfw/ui-feathers"
import {
  addId, BackendClient, DbStore, getListFormFromRelationshipField, ListStore,
  RelationShipWrapper, removeId, searchRelated, SharedFormList
} from "@xpfw/ui-shared"
import { globals, options, TestDefs, ValidationRegistry } from "@xpfw/validate"
import { get, isFunction } from "lodash"
import * as React from "react"
import { matchStoreState } from "resub-persist"
import makeMockElement from "../testUtil/baseMock"
import render from "../testUtil/render"
import login from "./login"

BackendClient.client = FeathersClient
globals.options.userIdPath = "id"

const testRelationship = () => {
  test("DbStore Create Test", async () => {
    const form = TestDefs.FormNumberAndRequiredText
    const s: any = [TestDefs.FormNumberAndRequiredText.collection, TestDefs.FormRelationshipToNumAndRequiredText.collection]
    const relationCol: any = TestDefs.FormNumberAndRequiredText.collection
    const appRef = await getRandomApp(s, false, BackendClient.client, true)
    TestDefs.FormNumberAndRequiredText.options = {idPath: "id"}
    TestDefs.FormRelationshipToNumAndRequiredText.options = {idPath: "id"}
    ValidationRegistry.registerForm(TestDefs.FormNumberAndRequiredText)
    ValidationRegistry.registerForm(TestDefs.FormRelationshipToNumAndRequiredText)
    const MockEle: any = makeMockElement("show")
    const createdEles: any = []
    for (let i = 0; i < 10; i++) {
      FormStore.setValue(TestDefs.RequiredTextField.mapTo, "myText " + i)
      FormStore.setValue(TestDefs.NumberField.mapTo, 420 + i)
      createdEles.push(await DbStore.create(form))
    }

    // SINGLE

    render(<SharedField field={TestDefs.RelationshipSingleField} />, "nothing set yet")
    FormStore.setValue(TestDefs.RelationshipSingleField.mapTo, "INVALID")
    render(<SharedField field={TestDefs.RelationshipSingleField} />, "set to invalid value")
    FormStore.setValue(TestDefs.RelationshipSingleField.mapTo, createdEles[0].result.id)
    render(<SharedField field={TestDefs.RelationshipSingleField} />, "set to first creation not loaded yet")
    await DbStore.getFromServer(createdEles[1].result.id, relationCol)
    FormStore.setValue(TestDefs.RelationshipSingleField.mapTo, createdEles[1].result.id)
    render(<SharedField field={TestDefs.RelationshipSingleField} />, "set to first creation loaded")

    // Multi
    FormStore.setValue(TestDefs.RelationshipMultiField.mapTo,
      [createdEles[3].result.id, createdEles[4].result.id, createdEles[5].result.id])
    await DbStore.getFromServer(createdEles[3].result.id, relationCol)
    await DbStore.getFromServer(createdEles[5].result.id, relationCol)
    render(<SharedField field={TestDefs.RelationshipMultiField} />, "multi load with one missing")
    await DbStore.getFromServer(createdEles[4].result.id, relationCol)
    render(<SharedField field={TestDefs.RelationshipMultiField} />, "multi load with none missing")
    const thisRef: any = {props: {field: TestDefs.RelationshipMultiField,
                                  prefix: TestDefs.RelationshipSingleField.mapTo}}
    const boundAddId = addId(thisRef)
    const boundRemoveId = removeId(thisRef)
    boundRemoveId(createdEles[5].result.id)
    render(<SharedField field={TestDefs.RelationshipMultiField} />, "multi removed one")
    boundRemoveId(createdEles[3].result.id)
    render(<SharedField field={TestDefs.RelationshipMultiField} />, "multi removed two")
    boundAddId(createdEles[7].result.id)
    render(<SharedField field={TestDefs.RelationshipMultiField} />, "multi added but not yet loaded")
    await DbStore.getFromServer(createdEles[7].result.id, relationCol)
    render(<SharedField field={TestDefs.RelationshipMultiField} />, "multi added and loaded")

    const thisRefSingle: any = {
      props: {
        field: TestDefs.RelationshipSingleField,
        prefix: TestDefs.RelationshipSingleField.mapTo
      }
    }
    const prefixedSingleValuePath = `${TestDefs.RelationshipSingleField.mapTo}.${TestDefs.RelationshipSingleField.mapTo}`
    FormStore.setValue(prefixedSingleValuePath, undefined)

    const searchFormSingle = getListFormFromRelationshipField(TestDefs.RelationshipMultiField)
    render(<SharedField field={TestDefs.RelationshipSingleField} prefix={TestDefs.RelationshipSingleField.mapTo} />, "nothing yet")
    const boundSearchRelatedSingle = searchRelated(thisRefSingle)
    const MockedSingleList = SharedFormList(MockEle)
    render(<SharedField field={TestDefs.RelationshipSingleField} prefix={TestDefs.RelationshipSingleField.mapTo}/>, "single search for my")
    await boundSearchRelatedSingle("Text")
    render(<SharedField field={TestDefs.RelationshipSingleField} prefix={TestDefs.RelationshipSingleField.mapTo} />, "single search for Text")
    await boundSearchRelatedSingle("null")
    render(<SharedField field={TestDefs.RelationshipSingleField} prefix={TestDefs.RelationshipSingleField.mapTo} />, "single search for null")

    // autoSelect single
    FormStore.setValue(prefixedSingleValuePath, undefined)
    render(<SharedField field={TestDefs.RelationshipSingleField} prefix={TestDefs.RelationshipSingleField.mapTo} />, "after reset")
    await boundSearchRelatedSingle("myText 2")
    render(<SharedField field={TestDefs.RelationshipSingleField} prefix={TestDefs.RelationshipSingleField.mapTo} />,
      "after autoselectable search without option enabled")
    FormStore.setValue(options.relationshipAutoSelect, true)
    await boundSearchRelatedSingle("myText")
    render(<SharedField field={TestDefs.RelationshipSingleField} prefix={TestDefs.RelationshipSingleField.mapTo} />,
      "after autoselectable search with option enabled but too many results")
    await boundSearchRelatedSingle("myText 2")
    render(<SharedField field={TestDefs.RelationshipSingleField} prefix={TestDefs.RelationshipSingleField.mapTo} />,
      "after autoselectable search with option enabled and set automatically")
    FormStore.setValue(options.relationshipAutoSelect, false)

    // Multi
    FormStore.setValue(`displayMode.${TestDefs.RelationshipMultiField.mapTo}`, 1)
    render(<SharedField field={TestDefs.RelationshipMultiField} prefix={TestDefs.RelationshipSingleField.mapTo} />, "nothing yet")
    const boundSearchRelated = searchRelated(thisRef)
    await boundSearchRelated("null")
    render(<SharedField field={TestDefs.RelationshipMultiField} prefix={TestDefs.RelationshipSingleField.mapTo} />, "search for null")
    await boundSearchRelated("my")
    render(<SharedField field={TestDefs.RelationshipMultiField} prefix={TestDefs.RelationshipSingleField.mapTo} />, "search for my")
    await boundSearchRelated("Text")
    render(<SharedField field={TestDefs.RelationshipMultiField} prefix={TestDefs.RelationshipSingleField.mapTo} />, "search for Text")
    FormStore.setValue(`displayMode.${TestDefs.RelationshipMultiField.mapTo}`, 0)
    render(<SharedField field={TestDefs.RelationshipMultiField} prefix={TestDefs.RelationshipSingleField.mapTo} />, "search for Text but displaymode for items")

    // autoSelect single
    FormStore.setValue(`${TestDefs.RelationshipSingleField.mapTo}.${TestDefs.RelationshipMultiField.mapTo}`, undefined)
    render(<SharedField field={TestDefs.RelationshipMultiField} prefix={TestDefs.RelationshipSingleField.mapTo} />, "after reset")
    await boundSearchRelated("myText 2")
    render(<SharedField field={TestDefs.RelationshipMultiField} prefix={TestDefs.RelationshipSingleField.mapTo} />,
      "multi after autoselectable search without option enabled")
    FormStore.setValue(options.relationshipAutoSelect, true)
    await boundSearchRelated("myText")
    render(<SharedField field={TestDefs.RelationshipMultiField} prefix={TestDefs.RelationshipSingleField.mapTo} />,
      "multi after autoselectable search with option enabled but too many results")
    await boundSearchRelated("myText 3")
    render(<SharedField field={TestDefs.RelationshipMultiField} prefix={TestDefs.RelationshipSingleField.mapTo} />,
      "multiafter autoselectable search with option enabled and set automatically")
    await boundSearchRelated("myText 5")
    render(<SharedField field={TestDefs.RelationshipMultiField} prefix={TestDefs.RelationshipSingleField.mapTo} />,
      "multiafter autoselectable search with option enabled and set automatically twice")
    FormStore.setValue(options.relationshipAutoSelect, false)

    const prefixes = ["", "customPre"]
    for (const prefix of prefixes) {
      FormStore.setValue(`displayMode.${TestDefs.RelationshipMultiField.mapTo}`, 1)
      FormStore.setValue(`${prefix}.displayMode.${TestDefs.RelationshipMultiField.mapTo}`, 1)
      render(<SharedField field={TestDefs.RelationshipMultiField} prefix={prefix} />, "nothing yet")
      const thisRef: any = {props: {
        field: TestDefs.RelationshipMultiField, prefix: prefix.length > 0 ?
        prefix + TestDefs.RelationshipMultiField.mapTo : TestDefs.RelationshipMultiField.mapTo
      }}
      const prefixSearch = searchRelated(thisRef)
      const searchForm = getListFormFromRelationshipField(TestDefs.RelationshipMultiField)
      const MockedList = SharedFormList(MockEle)
      await prefixSearch("my")
      console.log(`prefixsearchres is `, await prefixSearch("my"))
      render(<SharedField field={TestDefs.RelationshipMultiField} prefix={prefix} />, prefix + "search for my")
      await prefixSearch("Text")
      render(<SharedField field={TestDefs.RelationshipMultiField} prefix={prefix} />, prefix + "search for Text")
      await prefixSearch("null")
      render(<SharedField field={TestDefs.RelationshipMultiField} prefix={prefix} />, prefix + "search for null")
    }

    await appRef.cleanUp()
  }, 10000)
}

export default testRelationship
