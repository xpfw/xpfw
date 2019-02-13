import { IFieldProps, SharedField } from "@xpfw/form-shared"
import { globals, IField } from "@xpfw/validate"
import { cloneDeep, each, get } from "lodash"
import * as React from "react"
import { setFromEvent } from "./valueUtil"

class ObjectField extends React.Component<IFieldProps, any> {
  private onChange: any
  constructor(props: any) {
    super(props)
  }
  public render() {
    const children: any = []
    const objectDef = get(this.props.field, `validate.objectDef`)
    if (Array.isArray(objectDef)) {
      each(objectDef, (subFieldOptions: IField) => {
        const subField = cloneDeep(subFieldOptions)
        subField.mapTo = `${this.props.field.mapTo}.${subFieldOptions.mapTo}`
        children.push(<SharedField prefix={this.props.prefix} field={subField} />)
      })
    }
    return (
      <div>
        {children}
      </div>
    )
  }
}

export default ObjectField
