import { BackendClient, dataOptions, DbStore, IListHookProps, ListStore, toJS, useListWithProps } from "@xpfw/data"
import NedbClient from "@xpfw/data-nedb"
import { ExtendedJSONSchema, FormStore, iterateSubFields } from "@xpfw/form"
import { get, map } from "lodash"
import { observer } from "mobx-react"
import * as React from "react"
import { FaTrash } from "react-icons/fa"
import {
  CreatedAt, RecipeAuthor, RecipeDate, RecipeModel, RecipeName,
  TagCollectionModel, TagDescription, TagModel, TagName, Tags, Title
} from "../../globals"
import getForm from "./getForm"
import RelationshipListItem from "./relationshipListItem"

BackendClient.client = NedbClient

const createData = async (form: ExtendedJSONSchema) => {
  let list: any
  if (form.title === TagCollectionModel.title) {
    list = await ListStore.getList(TagModel, undefined, "list", true)
    list = list.data
  }
  for (let i = 0; i <= 19; i++) {
    if (form.title === RecipeModel.title) {
      FormStore.setValue(RecipeName.title, "Name#" + i, RecipeModel.title)
      FormStore.setValue(RecipeAuthor.title, "Author#" + i, RecipeModel.title)
      const date = new Date()
      date.setMonth(0)
      date.setDate(i)
      FormStore.setValue(RecipeDate.title, date, RecipeModel.title)
    } else if (form.title === TagModel.title) {
      FormStore.setValue(TagName.title, "tag#" + i, TagModel.title)
      FormStore.setValue(TagDescription.title, "desc#" + i, TagModel.title)
    } else if (form.title === TagCollectionModel.title) {
      FormStore.setValue(Title.title, "title#" + i, TagCollectionModel.title)
      const creationDate = new Date()
      creationDate.setDate(i)
      FormStore.setValue(CreatedAt.title, creationDate, TagCollectionModel.title)
      const newVals = list.length > 0 ? [list[i % 10]._id, list[(i + 2) % 10]._id, list[(i + 4) % 10]._id] : []
      newVals.splice(Math.floor(Math.random() * 3) + 1)
      FormStore.setValue(Tags.title, newVals, TagCollectionModel.title)
    }
    await DbStore.create(form)
  }
  FormStore.setValue(form.title, {})
  if (form.title === RecipeModel.title) {
    FormStore.setValue(RecipeName.title, "", RecipeModel.title)
    FormStore.setValue(RecipeAuthor.title, "", RecipeModel.title)
    FormStore.setValue(RecipeDate.title, new Date(), RecipeModel.title)
    FormStore.setValue("create." + RecipeDate.title, new Date(), RecipeModel.title)
  }
  await ListStore.makeQuery(form, "list")
}
const readyData = async (form: ExtendedJSONSchema) => {
  const res = await ListStore.makeQuery(form)
  if (res != null && res.total === 0) {
    await createData(form)
  }
}
const readyAll = async () => {
  await readyData(TagModel)
  await readyData(TagCollectionModel)
}
readyAll()
const promiseTimeout = (waitTime: number) => {
  return new Promise((resolve) => {setTimeout(resolve, waitTime)})
}

const resetData = async (form: ExtendedJSONSchema) => {
  let total = 1
  while (total !== 0) {
    const res = await ListStore.makeQuery(form, undefined, "none")
    console.log("RESULT OF QUERY IS", res)
    if (res != null) {
      if (res !== false) {
        total = res.total
        for (const item of res.data) {
          const c: any = form.collection
          await DbStore.remove(item._id, c)
        }
      } else {
        await promiseTimeout(50)
      }
    } else {
      total = 0
    }
  }
  await createData(form)
  await ListStore.getList(form, undefined, "list", true)
  if (form.collection === TagModel.collection) {
    await resetData(TagCollectionModel)
  }
}

const BulmaList: React.FunctionComponent<IListHookProps> = observer((props) => {
  const listProps = useListWithProps(props)
  const fields = []
  const loading = listProps.loading
  if (listProps.list != null && Array.isArray(listProps.list.data)) {
    for (const child of listProps.list.data) {
      const fieldContent: any[] = []
      iterateSubFields(props.schema, (key, subSchema) => {
        fieldContent.push(
          subSchema.theme === "single" ? (
            <RelationshipListItem schema={subSchema} collection={get(subSchema, "relationship.collection")} id={get(child, dataOptions.idPath)} />
          ) : subSchema.theme === "multi" ? (
            <div>
              {map(get(child, String(subSchema.title), []), (id: any) => {
                if (id === undefined || id === null || id === 0) {
                  return null
                }
                return (
                  <span><RelationshipListItem schema={subSchema} key={id} collection={get(subSchema, "relationship.collection")} id={id} />,</span>
                )
              })}
            </div>) : (
          <td>
            {JSON.stringify(get(child, String(subSchema.title)))}
          </td>
        ))
      })
      fields.push(
        <tr
          key={child._id}
          onClick={() => {
            FormStore.setValue(props.schema.title + "editId", child._id)
          }}
        >
          <td >
            {child._id}
          </td>
          {fieldContent}
          <td
            onClick={async (e) => {
              e.preventDefault()
              e.stopPropagation()
              const c: any = props.schema.collection
              DbStore.remove(child._id, c)
              await ListStore.getList(props.schema, undefined, "list", true)
            }}
          >
            <span className="has-text-danger">
              <FaTrash />
            </span>
          </td>
        </tr>
      )
    }
  }
  if (loading) {
    fields.push(
      <tr key="loading">
        <td>Loading</td>
      </tr>
    )
  }
  const headNames: any[] = []
  headNames.push(<th>ID</th>)
  iterateSubFields(props.schema, (key, subSchema) => {
    headNames.push(<th>{subSchema.title}</th>)
  })
  headNames.push(<th />)
  const pageBtns = (
    <nav className="pagination is-centered">
      <a className="pagination-previous" onClick={listProps.prevPage}>Prev</a>
      <a className="pagination-next" onClick={listProps.nextPage}>Next</a>
      <ul className="pagination-list">
        <li><a className="pagination-link is-current">{listProps.currentPage + 1}</a></li>
        <li><span className="pagination-ellipsis"> / </span></li>
        <li><a className="pagination-link">{listProps.maxPage}</a></li>
      </ul>
    </nav>
  )
  return (
    <div>
      <table className="table is-striped is-hoverable is-fullwidth">
        <thead>
          <tr>
            {headNames}
          </tr>
        </thead>
        <tbody>
          {fields}
        </tbody>
      </table>
      {pageBtns}
    </div>
  )
})

const UiList: React.FunctionComponent<{collection: string}> = (props) => {
  const form = getForm(props.collection)
  return (
    <BulmaList schema={form} prefix="list" />
  )
}
export default UiList
export {
  resetData, readyData
}
