import { IFieldProps } from "@xpfw/form-shared"
import { BooleanField } from "@xpfw/form-web"
import { get } from "lodash"
import * as React from "react"

class BulmaBooleanField extends React.Component<IFieldProps, any> {
  public render() {
    return (
      <div className="field">
        <div className="control">
          <label className="checkbox">
            <BooleanField {...this.props} />
            {get(this.props, "field.mapTo")}
          </label>
          </div>
      </div>
    )
  }
}

export default BulmaBooleanField
