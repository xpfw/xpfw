import { IFieldProps } from "@xpfw/form"
import { BooleanField } from "@xpfw/form-web"
import { get } from "lodash"
import * as React from "react"

const BulmaBooleanField: React.FunctionComponent<IFieldProps> = (props) => {
  return (
    <div className="field">
      <div className="control">
        <label className="checkbox">
          <BooleanField {...props} />
          {get(props, "schema.title")}
        </label>
        </div>
    </div>
  )
}

export default BulmaBooleanField
