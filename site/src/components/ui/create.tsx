import * as React from 'react'
import { IField } from "@xpfw/validate"
import { SharedField } from '@xpfw/form-shared';
import { IFormCreateProps, SharedFormCreate, ListStore } from '@xpfw/ui-shared';
import { get } from "lodash"

class MiniCreate extends React.Component<IFormCreateProps, any> {
  public render() {
    const fields = this.props.fields.map((field: IField) => {
      return <SharedField key={field.mapTo} field={field} prefix={this.props.prefix} />
    })
    const gotErr = get(this.props, "error.errors.length", 0)
    const result = get(this.props, "state.result")
    const loading = get(this.props, "state.loading", false)
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
          Successfully created {get(result, "_id")}
        </div>
      )
    }
    return (
      <div>
        {fields}
        <a className="button is-primary" onClick={async () => {
          await this.props.submitCreate()
          await ListStore.getList(`list.${this.props.form.model}`,this.props.form, "list", true)
        }}>Create</a>
        {msg}
      </div>
    )
  }
}

const WebCreate: React.ComponentType<any> = SharedFormCreate<{}>(MiniCreate)
export default WebCreate