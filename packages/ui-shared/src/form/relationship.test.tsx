import { ComponentRegistry, FormStore, SharedField } from "@xpfw/form-shared"
import { getRandomApp } from "@xpfw/test-util"
import { FeathersClient } from "@xpfw/ui-feathers"
import { FieldType, TestDefs } from "@xpfw/validate"
import "isomorphic-fetch"
import { get } from "lodash"
import * as render from "preact-render-to-json"
import * as React from "react"
import { matchStoreState } from "resub-persist"
import BackendClient from "../client"
import { submitCreate } from "../components/create"
import DbStore from "../store/db"
import makeMockElement from "../testUtil/makeMockElement"
import RelationShipWrapper, { addId, removeId, searchRelated } from "./relationship"

BackendClient.client = FeathersClient

test("Relationship Fetching Test", async () => {
  const form = TestDefs.FormNumberAndRequiredText
  const s: any = [TestDefs.FormNumberAndRequiredText.collection, TestDefs.FormRelationshipToNumAndRequiredText.collection]
  const relationCol: any = TestDefs.FormNumberAndRequiredText.collection
  const appRef = await getRandomApp(s, false, BackendClient.client, true)
  const MockEle: any = makeMockElement("show")
  const MockedRelationship = RelationShipWrapper(MockEle)
  ComponentRegistry.registerComponent(FieldType.RelationshipSingle, MockedRelationship)
  ComponentRegistry.registerComponent(FieldType.RelationshipMulti, MockedRelationship)
  const createdEles: any = []
  for (let i = 0; i < 10; i++) {
    FormStore.setValue(TestDefs.RequiredTextField.mapTo, "myText " + i)
    FormStore.setValue(TestDefs.NumberField.mapTo, 420 + i)
    createdEles.push(await submitCreate({props: {form}})())
  }

  // SINGLE

  expect(render(<SharedField field={TestDefs.RelationshipSingleField} />)).toMatchSnapshot("nothing set yet")
  FormStore.setValue(TestDefs.RelationshipSingleField.mapTo, "INVALID")
  expect(render(<SharedField field={TestDefs.RelationshipSingleField} />)).toMatchSnapshot("set to invalid value")
  FormStore.setValue(TestDefs.RelationshipSingleField.mapTo, createdEles[0].result.id)
  expect(render(<SharedField field={TestDefs.RelationshipSingleField} />)).toMatchSnapshot("set to first creation not loaded yet")
  await DbStore.getFromServer(createdEles[1].result.id, relationCol)
  FormStore.setValue(TestDefs.RelationshipSingleField.mapTo, createdEles[1].result.id)
  expect(render(<SharedField field={TestDefs.RelationshipSingleField} />)).toMatchSnapshot("set to first creation loaded")
  FormStore.setValue(TestDefs.RelationshipMultiField.mapTo, [createdEles[3].result.id, createdEles[4].result.id, createdEles[5].result.id])

  // Multi

  await DbStore.getFromServer(createdEles[3].result.id, relationCol)
  await DbStore.getFromServer(createdEles[5].result.id, relationCol)
  expect(render(<SharedField field={TestDefs.RelationshipMultiField} />)).toMatchSnapshot("multi load with one missing")
  await DbStore.getFromServer(createdEles[4].result.id, relationCol)
  expect(render(<SharedField field={TestDefs.RelationshipMultiField} />)).toMatchSnapshot("multi load with none missing")
  const thisRef: any = {props: {field: TestDefs.RelationshipMultiField}}
  const boundAddId = addId(thisRef)
  const boundRemoveId = removeId(thisRef)
  boundRemoveId(createdEles[5].result.id)
  expect(render(<SharedField field={TestDefs.RelationshipMultiField} />)).toMatchSnapshot("multi removed one")
  boundRemoveId(createdEles[3].result.id)
  expect(render(<SharedField field={TestDefs.RelationshipMultiField} />)).toMatchSnapshot("multi removed two")
  boundAddId(createdEles[7].result.id)
  expect(render(<SharedField field={TestDefs.RelationshipMultiField} />)).toMatchSnapshot("multi added but not yet loaded")
  await DbStore.getFromServer(createdEles[7].result.id, relationCol)
  expect(render(<SharedField field={TestDefs.RelationshipMultiField} />)).toMatchSnapshot("multi added and loaded")
  await appRef.cleanUp()
}, 10000)
