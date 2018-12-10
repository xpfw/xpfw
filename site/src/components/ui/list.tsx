import { IFormListProps, SharedFormList, ListStore, DbStore, BackendClient } from '@xpfw/ui-shared';
import { globals, filterFields, ValidationRegistry, IForm, FieldType } from '@xpfw/validate';
import { each, get, map } from "lodash"
import * as React from "react"
import { FormStore } from "@xpfw/form-shared";
import {
  RecipeName, RecipeAuthor, RecipeDate, RecipeModel, CreatedAt,
  TagModel, TagCollectionModel, TagName, Title, TagDescription, Tags
} from "../../globals";
import NedbClient from '@xpfw/ui-nedb';
import { FaTrash } from "react-icons/fa"
import RelationshipListItem from './relationshipListItem';
BackendClient.client = NedbClient

const createData = async (form: IForm) => {
  let list: any
  if(form.model === TagCollectionModel.model) {
    list = await ListStore.getList(`list.${TagModel.model}`, TagModel, "list", true)
    list = list.result
  }
  for (let i = 0; i <= 20; i++) {
    if (form.model === RecipeModel.model) {
      FormStore.setValue(RecipeName.mapTo, "Name#"+i)
      FormStore.setValue(RecipeAuthor.mapTo, "Author#"+i)
      const date = new Date()
      date.setMonth(0)
      date.setDate(i)
      FormStore.setValue(RecipeDate.mapTo, date)
    } else if(form.model === TagModel.model) {
      FormStore.setValue(TagName.mapTo, "tag#"+i)
      FormStore.setValue(TagDescription.mapTo, "desc#"+i)
    } else if(form.model === TagCollectionModel.model) {
      FormStore.setValue(Title.mapTo, "title#"+i)
      const creationDate = new Date()
      creationDate.setDate(i)
      FormStore.setValue(CreatedAt.mapTo, creationDate)
      FormStore.setValue(Tags.mapTo, [list[i % 10]._id,list[(i+2) % 10]._id,list[(i + 4) % 10]._id])
    }
    await DbStore.create(form)
  }
  FormStore.resetForm(form)
  if (form.model === RecipeModel.model) {
    FormStore.setValue(RecipeName.mapTo, "")
    FormStore.setValue(RecipeAuthor.mapTo, "")
    FormStore.setValue(RecipeDate.mapTo, new Date())
    FormStore.setValue("create." + RecipeDate.mapTo, new Date())
  }
  await ListStore.makeQuery( form, "list" )
}
const readyData = async (form: IForm) => {
  const res = await ListStore.makeQuery(form)
  console.log(" references are ", res)
  if (res.total === 0) {
    await createData(form)
  }
}

const resetData = async (form: IForm) => {
  let total = 1
  while (total !== 0) {
    const res = await ListStore.makeQuery(form, "none")
    total = res.total
    for (const item of res.result) {
      const c: any = form.collection
      await DbStore.remove(item._id, c)
    }
  }
  await createData(form)
}

class WebFormL extends React.Component<IFormListProps, any> {
  public componentWillMount() {
    readyData(this.props.form)
  }
  public render() {
    const fields = []
    const loading = get(this.props, "list.loading", false)
    const formFields = filterFields(this.props.form, globals.Method.Find)
    for (const child of get(this.props, "list.result", [])) {
      const fieldContent: any[] = []
      if (child !== null && child !== undefined) {
        each(formFields, (field: any) => {
          fieldContent.push(
            field.type === FieldType.RelationshipSingle ? (
              <RelationshipListItem loading={false} field={field} collection={get(field, "validate.relationshipCollection")} id={get(child, "field.mapTo")} />
            ) : field.type === FieldType.RelationshipMulti ? (
              <div>
                {map(get(child, field.mapTo, []), (id: any) => {
                  if (id === undefined || id === null || id === 0) {
                    return null
                  }
                  return (
                    <span><RelationshipListItem loading={false} key={id} field={field} collection={get(field, "validate.relationshipCollection")} id={id} />,</span>
                  )
                })}
              </div>) : (
            <td>
              {JSON.stringify(get(child, field.mapTo))}
            </td>
          ))
        })
        fields.push(
          <tr key={child._id} onClick={() => {
            FormStore.setValue(this.props.form.model + "editId", child._id)
          }}>
            <td >
              {child._id}
            </td>
            {fieldContent}
            <td onClick={async (e) => {
              e.preventDefault()
              e.stopPropagation()
              const c: any = this.props.form.collection
              DbStore.remove(child._id, c)
              await ListStore.getList(`list.${this.props.form.model}`, this.props.form, "list", true)
            }}>
              <span className="has-text-danger">
                <FaTrash/>
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
    headNames.push(<th key="id">ID</th>)
    each(formFields, (field: any) => {
      headNames.push(<th key={field.mapTo}>{field.mapTo}</th>)
    })
    headNames.push(<th key="empty"></th>)
    const pageBtns = (
      <nav className="pagination is-centered">
        <a className="pagination-previous" onClick={this.props.prevPage}>Prev</a>
        <a className="pagination-next" onClick={this.props.nextPage}>Next</a>
        <ul className="pagination-list">
          <li><a className="pagination-link is-current">{this.props.currentPage + 1}</a></li>
          <li><span className="pagination-ellipsis"> / </span></li>
          <li><a className="pagination-link">{this.props.maxPage}</a></li>
        </ul>
      </nav>
    )
    const props = this.props
    return (
      <div className="tableLimit">
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
  }
}

const WebFormList: React.ComponentType<any> = SharedFormList<{}>(WebFormL)

class UiList extends React.Component<{collection: string}, any> {
  public render() {
    const form = ValidationRegistry.forms[this.props.collection]
    return (
      <WebFormList form={form} prefix="list" />
    )
  }
}

export default UiList
export {
  WebFormL, resetData
}
