import { getMapToFromProps, IFieldProps, SharedField, useObject } from "@xpfw/form"
import { observer } from "mobx-react"
import * as React from "react"

const ObjectField: React.FunctionComponent<IFieldProps> = observer((props) => {
  const fieldHelper = useObject(props.schema, getMapToFromProps(props), props.prefix)
  return (
    <div>
      {fieldHelper.fields.map((subField) => <SharedField {...subField} key={subField.mapTo} />)}
    </div>
  )
})

export default ObjectField
