import * as React from 'react'
import { IField } from "@xpfw/validate"
import { SharedField, FormStore } from '@xpfw/form-shared';
import { registerComponents } from '@xpfw/form-bulma';
import { IFormEditProps, SharedFormEdit, ListStore } from '@xpfw/ui-shared';
import { get } from "lodash"
import { ComponentBase } from 'resub';
registerComponents()

class MiniEdit extends React.Component<IFormEditProps, any> {
  public render() {
    const fields = this.props.fields.map((field: IField) => {
      return <SharedField key={field.mapTo} field={field} prefix={this.props.prefix} />
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
        <button onClick={async () => {
          await this.props.submitEdit()
          await ListStore.getList(`list.${this.props.form.model}`, this.props.form, "list", true)
        }}>Save Changes</button>
        {msg}
      </div>
    )
  }
}

const ConnectedMiniEdit: React.ComponentType<any> = SharedFormEdit<{}>(MiniEdit)


class ChangeableMiniEdit extends ComponentBase<any, any> {
  public render() {
    return (
      <div>
        {this.state.currentId ? <ConnectedMiniEdit form={this.props.form} id={this.state.currentId} /> : (
          <span>No item selected yet for editing.</span>
        )}
      </div>
    )
  }
  protected _buildState(props: any, initialBuild: boolean): any {
    return {
      currentId: FormStore.getValue(this.props.form.model + "editId")
    }
  }
}

export default ChangeableMiniEdit
