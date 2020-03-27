import { getMapToFromProps, IFieldProps, prependPrefix, SharedField, useArray } from "@xpfw/form"
import { observer } from "mobx-react"
import * as React from "react"

const ArrayField: React.FunctionComponent<IFieldProps> = observer((props) => {
  const arrayHelper = useArray(props.schema, getMapToFromProps(props), props.prefix)
  return (
    <div>
      {arrayHelper.fields.map((field) => {
        return (
        <div className="flex flex1 center" key={prependPrefix(field.mapTo, field.prefix)}>
          <SharedField schema={field.schema} mapTo={field.mapTo} prefix={field.prefix} />
          <a
            className="button is-warning  iconMargin"
            style={{marginTop: "1.2rem"}}
            onClick={field.decreaseSize}
          >
            Delete
          </a>
        </div>
      )})}
      <div className="flex center">
        <a
          className="is-fullwidth is-info"
          onClick={arrayHelper.increaseSize}
        >
          Add
        </a>
      </div>
    </div >
  )
})

export default ArrayField
