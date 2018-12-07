import { IFormListProps, ISharedFormList, SharedFormList } from "@xpfw/ui-shared"
import { filterFields, globals } from "@xpfw/validate"
import { each, get } from "lodash"
import * as React from "react"
import BulmaRemove from "./remove"

class WebFormL extends React.Component<IFormListProps, any> {
  public render() {
    const fields = []
    const loading = this.props.loading
    const formFields = filterFields(this.props.form, globals.Method.Find)
    for (const child of get(this.props, "list.result", [])) {
      const fieldContent: any[] = []
      each(formFields, (field: any) => {
        fieldContent.push((
          <td>
            {JSON.stringify(get(child, field.mapTo))}
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
              <BulmaRemove form={this.props.form} id={child._id} />
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
    each(formFields, (field: any) => {
      headNames.push(<th>{field.mapTo}</th>)
    })
    headNames.push(<th />)
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
  }
}

const BulmaList: React.ComponentType<ISharedFormList> = SharedFormList<{}>(WebFormL)

export default BulmaList
