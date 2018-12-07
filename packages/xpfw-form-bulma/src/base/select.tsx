import { IFieldProps } from "@xpfw/form-shared"
import { SelectField } from "@xpfw/form-web"
import { get } from "lodash"
import * as React from "react"
import FieldContainer from "./fieldWrapper"

class BulmaSelectField extends React.Component<IFieldProps, any> {
  public render() {
    const gotErr = get(this.props, "error.errors.length", 0) > 0
    const classNames = `select ${gotErr ? "is-danger" : "is-success"}`
    return (
      <FieldContainer {...this.props}>
        <div className="control">
          <div className={classNames}>
            <SelectField {...this.props} />
          </div>
        </div>
      </FieldContainer>
    )
  }
}

export default BulmaSelectField
