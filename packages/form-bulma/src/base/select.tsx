import { IFieldProps } from "@xpfw/form"
import { SelectField } from "@xpfw/form-web"
import { get } from "lodash"
import * as React from "react"
import FieldContainer from "./fieldWrapper"

const BulmaSelectField: React.FunctionComponent<IFieldProps> = (props) => {
  return (
    <FieldContainer {...props}>
      <div className="control">
        <SelectField {...props} />
      </div>
    </FieldContainer>
  )
}

export default BulmaSelectField
