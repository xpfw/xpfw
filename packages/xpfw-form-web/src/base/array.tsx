import { IArrayProps, IFieldProps, SharedArray, SharedField } from "@xpfw/form-shared"
import { IField } from "@xpfw/validate"
import { cloneDeep, get, map } from "lodash"
import * as React from "react"
class BulmaArrayField extends React.Component<IArrayProps, any> {
  public render() {
    return (
      <div>
        {map(this.props.subFields, (field: any, index: any) => {
          return (
          <div className="flex flex1 center">
            <SharedField field={field} prefix={this.props.prefix} />
            <a
              className="button is-warning  iconMargin"
              style={{marginTop: "1.2rem"}}
              onClick={this.props.removeItem(index)}
            >
              Delete
            </a>
          </div>
        )})}
        <div className="flex center">
          <a
            className="is-fullwidth is-info"
            onClick={this.props.increaseSize}
          >
            Add
          </a>
        </div>
      </div >
    )
  }
}

const BulmaArrayFieldWrapped = SharedArray(BulmaArrayField)
export default BulmaArrayFieldWrapped
