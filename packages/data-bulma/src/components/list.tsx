import { IListHookProps, useListWithProps } from "@xpfw/data"
import { iterateSubFields } from "@xpfw/form/dist"
import { each, get } from "lodash"
import { observer } from "mobx-react-lite"
import * as React from "react"
import BulmaRemove from "./remove"

const BulmaList: React.FunctionComponent<IListHookProps> = observer((props) => {
  const listProps = useListWithProps(props)
  const fields = []
  const loading = listProps.loading
  for (const child of get(listProps, "list", [])) {
    const fieldContent: any[] = []
    iterateSubFields(props.schema, (key, subSchema) => {
      fieldContent.push((
        <td>
          {JSON.stringify(get(child, String(subSchema.title)))}
        </td>
      ))
    })
    fields.push(
      <tr key={child._id}>
        <td >
          {child._id}
        </td>
        {fieldContent}
        <td>
          <span className="has-text-danger">
            <BulmaRemove schema={props.schema} id={child._id} />
          </span>
        </td>
      </tr>
    )
  }
  if (loading) {
    fields.push(
      <tr>
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

export default BulmaList
