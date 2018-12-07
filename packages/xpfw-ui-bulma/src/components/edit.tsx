import { FormStore, SharedField } from "@xpfw/form-shared"
import { IFormEditProps, ISharedFormEdit, ListStore, SharedFormEdit } from "@xpfw/ui-shared"
import { getFieldsFromForm,  IField } from "@xpfw/validate"
import { get } from "lodash"
import * as React from "react"

class MiniEdit extends React.Component<IFormEditProps, any> {
  public render() {
    const fields = this.props.fields.map((field: IField) => {
      return <SharedField key={field.mapTo} field={field} prefix={this.props.prefix} user={this.props.user} />
    })
    const gotErr = get(this.props, "error.errors.length", 0)
    const result = get(this.props, "state.result")
    let msg: any
    if (gotErr) {
      msg = (
        <div className="notification is-danger">
          Error please recheck your inputs or connection {JSON.stringify(get(this.props, "error"))}
        </div>
      )
    }
    if (result) {
      msg = (
        <div className="notification is-success">
          Successfully saved changes to {get(result, "_id")}
        </div>
      )
    }
    return (
      <div>
        {fields}
        <button onClick={this.props.submitEdit}>Save Changes</button>
        {msg}
      </div>
    )
  }
}

const BulmaEdit: React.ComponentType<ISharedFormEdit> = SharedFormEdit<{}>(MiniEdit)

export default BulmaEdit
