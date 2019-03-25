import { dataOptions, IEditHookProps, useEditWithProps } from "@xpfw/data";
import {  getMapToFromProps, iterateSubFields, prependPrefix, SharedField } from "@xpfw/form"
import { get } from "lodash"
import { observer } from "mobx-react-lite";
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
      <button onClick={editProps.submitEdit}>Save Changes</button>
      {msg}
    </div>
  )
})

export default BulmaEdit
