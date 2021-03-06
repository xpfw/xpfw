import { IFieldProps } from "@xpfw/form"
import { TextField } from "@xpfw/form-web"
import * as React from "react"
import FieldContainer from "./fieldWrapper"
import SelectComponent from "./select"

const BulmaTextField: React.FunctionComponent<IFieldProps> = (props) => {
  switch (props.schema.format) {
    case "select": {
      return <SelectComponent {...props} />
    }
  }
  return (
    <FieldContainer {...props}>
      <TextField
        {...props}
        className="input"
      />
    </FieldContainer>
  )
}

export default BulmaTextField
