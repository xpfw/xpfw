import * as React from 'react'
import { IField, getFieldsFromForm } from "@xpfw/validate"
import { SharedField, FormStore } from '@xpfw/form-shared';
import { RecipeModel } from '../globals';


class DemoForm extends React.Component<any, any> {
  public render() {
    const fieldDefs = getFieldsFromForm(RecipeModel)
    const fields = fieldDefs.map((field: IField) => {
      return <SharedField key={field.mapTo} field={field} prefix="demo" />
    })
    return (
      <div>
        {fields}
      </div>
    )
  }
}

export default DemoForm