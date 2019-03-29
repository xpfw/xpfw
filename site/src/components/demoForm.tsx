import { iterateSubFields, SharedField } from "@xpfw/form"
import * as React from "react"
import { RecipeModel } from "../globals"

const DemoForm: React.FunctionComponent<any> = () => {
  const fields: any[] = []
  iterateSubFields(RecipeModel, (key, subSchema) => {
    fields.push(<SharedField key={key} schema={subSchema} prefix="demo" />)
  })
  return (
    <div>
      {fields}
    </div>
  )
}

export default DemoForm
