import {
  addId, BackendClient, dataOptions, DbStore, displayModeChanger,
  getListFormFromRelationshipField, removeId, searchRelated
} from "@xpfw/data"
import { FeathersClient } from "@xpfw/data-feathers"
import { FormStore, SharedField, useField, useFieldWithValidation } from "@xpfw/form"
import {
  makeSubFields, NameField, NumberAndRequiredTextSchema, NumberField,
  RelationshipAndNumberSchema, RelationshipMultiField, RelationshipSingleField
} from "@xpfw/form-tests"
import { getRandomApp } from "@xpfw/test-util"
import { set } from "lodash"
import * as React from "react"
import render from "../testUtil/render"
import login from "./login"

BackendClient.client = FeathersClient
dataOptions.idPath = "_id"

const testRelationship = () => {
  test("DbStore Create Test", async () => {
    dataOptions.idPath = "_id"
    const schema = NumberAndRequiredTextSchema
    const s: any = [NumberAndRequiredTextSchema.collection, RelationshipAndNumberSchema.collection]
    const relationCol: any = NumberAndRequiredTextSchema.collection
    const appRef = await getRandomApp(s, true, BackendClient.client, false)
    const createdEles: any = []
    const fields = makeSubFields(NumberAndRequiredTextSchema)
    const origId = `b29999999999999999999999`
    for (let i = 0; i < 10; i++) {
      fields[String(NameField.title)].setValue("myText " + i)
      fields[String(NumberField.title)].setValue(420 + i)
      FormStore.setValue(`${NumberAndRequiredTextSchema.title}._id`,
        `${origId.substring(0, origId.length - String(i).length - 5)}${i}98765`)
      createdEles.push(await DbStore.create(schema))
    }

    // SINGLE

    const singleField = useFieldWithValidation(RelationshipSingleField)
    render(<SharedField schema={RelationshipSingleField} />, "nothing set yet")
    singleField.setValue("INVALID")
    render(<SharedField schema={RelationshipSingleField} />, "set to invalid value")
    singleField.setValue(createdEles[0]._id)
    render(<SharedField schema={RelationshipSingleField} />, "set to first creation not loaded yet")
    await DbStore.getFromServer(createdEles[1]._id, relationCol)
    singleField.setValue(createdEles[1]._id)
    render(<SharedField schema={RelationshipSingleField} />, "set to first creation loaded")

    // Multi
    const multiField = useFieldWithValidation(RelationshipMultiField)
    multiField.setValue([createdEles[3]._id, createdEles[4]._id, createdEles[5]._id])
    await DbStore.getFromServer(createdEles[3]._id, relationCol)
    await DbStore.getFromServer(createdEles[5]._id, relationCol)
    render(<SharedField schema={RelationshipMultiField} />, "multi load with one missing")
    await DbStore.getFromServer(createdEles[4]._id, relationCol)
    render(<SharedField schema={RelationshipMultiField} />, "multi load with none missing")
    const boundAddId = addId(RelationshipMultiField)
    const boundRemoveId = removeId(RelationshipMultiField)
    boundRemoveId(createdEles[5]._id)
    render(<SharedField schema={RelationshipMultiField} />, "multi removed one")
    boundRemoveId(createdEles[3]._id)
    render(<SharedField schema={RelationshipMultiField} />, "multi removed two")
    boundAddId(createdEles[7]._id)
    render(<SharedField schema={RelationshipMultiField} />, "multi added but not yet loaded")
    await DbStore.getFromServer(createdEles[7]._id, relationCol)
    render(<SharedField schema={RelationshipMultiField} />, "multi added and loaded")

    const prefixedSingle = useFieldWithValidation(RelationshipSingleField, undefined, RelationshipSingleField.title)
    prefixedSingle.setValue(undefined)

    const searchschemaSingle = getListFormFromRelationshipField(RelationshipMultiField)
    render(<SharedField schema={RelationshipSingleField} prefix={RelationshipSingleField.title} />, "nothing yet")
    let boundSearchRelatedSingle = searchRelated(RelationshipSingleField, undefined, RelationshipSingleField.title)
    render(<SharedField schema={RelationshipSingleField} prefix={RelationshipSingleField.title}/>, "single search for my")
    await boundSearchRelatedSingle("Text")
    render(<SharedField schema={RelationshipSingleField} prefix={RelationshipSingleField.title} />, "single search for Text")
    await boundSearchRelatedSingle("null")
    render(<SharedField schema={RelationshipSingleField} prefix={RelationshipSingleField.title} />, "single search for null")

    // autoSelect single
    prefixedSingle.setValue(undefined)
    render(<SharedField schema={RelationshipSingleField} prefix={RelationshipSingleField.title} />, "after reset")
    await boundSearchRelatedSingle("myText 2")
    render(<SharedField schema={RelationshipSingleField} prefix={RelationshipSingleField.title} />,
      "after autoselectable search without option enabled")
    set(RelationshipSingleField, "relationship.autoSelect", true)
    boundSearchRelatedSingle = searchRelated(RelationshipSingleField, undefined, RelationshipSingleField.title)
    await boundSearchRelatedSingle("myText")
    render(<SharedField schema={RelationshipSingleField} prefix={RelationshipSingleField.title} />,
      "after autoselectable search with option enabled but too many results")
    await boundSearchRelatedSingle("myText 2")
    render(<SharedField schema={RelationshipSingleField} prefix={RelationshipSingleField.title} />,
      "after autoselectable search with option enabled and set automatically")
    set(RelationshipSingleField, "relationship.autoSelect", false)

    // Multi
    const displaySetter = displayModeChanger(String(RelationshipMultiField.title), RelationshipSingleField.title)
    displaySetter(1)
    render(<SharedField schema={RelationshipMultiField} prefix={RelationshipSingleField.title} />, "nothing yet")
    let boundSearchRelated = searchRelated(RelationshipMultiField, undefined, RelationshipSingleField.title)
    await boundSearchRelated("null")
    render(<SharedField schema={RelationshipMultiField} prefix={RelationshipSingleField.title} />, "search for null")
    await boundSearchRelated("my")
    render(<SharedField schema={RelationshipMultiField} prefix={RelationshipSingleField.title} />, "search for my")
    await boundSearchRelated("Text")
    render(<SharedField schema={RelationshipMultiField} prefix={RelationshipSingleField.title} />, "search for Text")
    displaySetter(0)
    render(<SharedField schema={RelationshipMultiField} prefix={RelationshipSingleField.title} />, "search for Text but displaymode for items")

    // autoSelect multi
    FormStore.setValue(`${RelationshipSingleField.title}.${RelationshipMultiField.title}`, undefined)
    render(<SharedField schema={RelationshipMultiField} prefix={RelationshipSingleField.title} />, "after reset")
    await boundSearchRelated("myText 2")
    render(<SharedField schema={RelationshipMultiField} prefix={RelationshipSingleField.title} />,
      "multi after autoselectable search without option enabled")
    set(RelationshipMultiField, "relationship.autoSelect", true)
    boundSearchRelated = searchRelated(RelationshipMultiField, undefined, RelationshipSingleField.title)
    await boundSearchRelated("myText")
    render(<SharedField schema={RelationshipMultiField} prefix={RelationshipSingleField.title} />,
      "multi after autoselectable search with option enabled but too many results")
    await boundSearchRelated("myText 3")
    render(<SharedField schema={RelationshipMultiField} prefix={RelationshipSingleField.title} />,
      "multiafter autoselectable search with option enabled and set automatically")
    await boundSearchRelated("myText 5")
    render(<SharedField schema={RelationshipMultiField} prefix={RelationshipSingleField.title} />,
      "multiafter autoselectable search with option enabled and set automatically twice")
    set(RelationshipMultiField, "relationship.autoSelect", false)
    boundSearchRelated = searchRelated(RelationshipMultiField, undefined, RelationshipSingleField.title)

    const prefixes = ["", "customPre"]
    for (const prefix of prefixes) {
      const dpModeC = displayModeChanger(String(RelationshipMultiField.title))
      const dpModeCP = displayModeChanger(String(RelationshipMultiField.title))
      dpModeC(1)
      dpModeCP(1)
      render(<SharedField schema={RelationshipMultiField} prefix={prefix} />, "nothing yet")
      const thisRef: any = {props: {
        field: RelationshipMultiField, prefix: prefix.length > 0 ?
        prefix + RelationshipMultiField.title : RelationshipMultiField.title
      }}
      const prefixSearch = searchRelated(RelationshipMultiField, undefined, prefix)
      await prefixSearch("my")
      render(<SharedField schema={RelationshipMultiField} prefix={prefix} />, prefix + "search for my")
      await prefixSearch("Text")
      render(<SharedField schema={RelationshipMultiField} prefix={prefix} />, prefix + "search for Text")
      await prefixSearch("null")
      render(<SharedField schema={RelationshipMultiField} prefix={prefix} />, prefix + "search for null")
    }

    await appRef.cleanUp()
  }, 10000)
}

export default testRelationship
