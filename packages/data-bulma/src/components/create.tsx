import * as React from "react"

import { dataOptions,  ICreateHookProps, useCreateWithProps } from "@xpfw/data"
import { getMapToFromProps, iterateSubFields, prependPrefix, SharedField } from "@xpfw/form"
import { get } from "lodash"
import { observer } from "mobx-react-lite"

const BulmaCreate: React.FunctionComponent<ICreateHookProps> = observer((props) => {
  const createProps = useCreateWithProps(props)
  const fields: any[] = []
  iterateSubFields(props.schema, (key, schema) => {
    fields.push(<SharedField key={key} schema={schema} prefix={prependPrefix(getMapToFromProps(props), props.prefix)} />)
  })
  const gotErr = createProps.error != null
  const result = createProps.state
  let msg: any
  if (gotErr) {
    msg = (
      <div className="notification is-danger">
        Error please recheck your inputs or connection {JSON.stringify(createProps.error)}
      </div>
    )
  }
  if (result) {
    msg = (
      <div className="notification is-success">
        Successfully created {get(result, dataOptions.idPath)}
      </div>
    )
  }
  return (
    <div>
      {fields}
      <a className="button is-primary" onClick={createProps.submitCreate}>Create</a>
      {msg}
    </div>
  )

})

export default BulmaCreate
export {
  ICreateHookProps
}
