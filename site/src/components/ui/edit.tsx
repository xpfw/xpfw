import { dataOptions, IEditHookProps, ListStore, useEditWithProps } from "@xpfw/data"
import {  FormStore, getMapToFromProps, iterateSubFields, prependPrefix, SharedField } from "@xpfw/form"
import { get } from "lodash"
import { observer } from "mobx-react-lite"
import * as React from "react"

const BulmaEdit: React.FunctionComponent<IEditHookProps> = observer((props) => {
  const editProps = useEditWithProps(props)
  const fields: any[] = []
  iterateSubFields(props.schema, (key, schema) => {
    fields.push(<SharedField key={key} schema={schema} prefix={prependPrefix(getMapToFromProps(props), props.prefix)} />)
  })
  const gotErr = editProps.error != null
  const result = editProps.state
  let msg: any
  if (gotErr) {
    msg = (
      <div className="notification is-danger">
        Error please recheck your inputs or connection {JSON.stringify(editProps.error)}
      </div>
    )
  }
  if (result) {
    msg = (
      <div className="notification is-success">
        Successfully saved changes to {get(result, dataOptions.idPath)}
      </div>
    )
  }
  return (
    <div>
      {fields}
        <a
          className="button is-primary"
          onClick={async () => {
            editProps.submitEdit()
            ListStore.setCollectionDirty(String(props.schema.collection), true)
            await ListStore.getList(props.schema, undefined, "list", true)
          }}
        >
          Save
        </a>
      {msg}
    </div>
  )
})

const ChangeableMiniEdit: React.FunctionComponent<any> = observer((props) => {
  const currentId = FormStore.getValue(props.schema.title + "editId")
  return (
    <div>
      {currentId ? <BulmaEdit schema={props.schema} id={currentId} /> : (
        <span>No item selected yet for editing.</span>
      )}
    </div>
  )
})

export default ChangeableMiniEdit
