import * as React from "react"

import { SharedField } from "@xpfw/form-shared"
import { IFormCreateProps, ISharedFormCreate, SharedFormCreate } from "@xpfw/ui-shared"
import {  IField } from "@xpfw/validate"
import { get } from "lodash"

class BulmaCreate extends React.Component<IFormCreateProps, any> {
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
          Successfully created {get(result, get(this.props.form, "options.idPath", "_id"))}
        </div>
      )
    }
    return (
      <div>
        {fields}
        <a className="button is-primary" onClick={this.props.submitCreate}>Create</a>
        {msg}
      </div>
    )
  }
}

const WrappedBulmaCreate: React.ComponentType<ISharedFormCreate> = SharedFormCreate<{}>(BulmaCreate)
export default WrappedBulmaCreate
export {
  IFormCreateProps
}
