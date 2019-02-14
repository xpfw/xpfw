import { get } from "lodash-es"
import * as React from "react"
import ComponentRegistry, { IFieldProps } from "../store/componentRegistry"

const SharedField: React.FunctionComponent<IFieldProps> = (props) => {
  const Component: any = ComponentRegistry.getComponent(
    get(props, "schema.type"), get(props, "theme", get(props, "schema.theme")))
  return <Component {...props} />
}

export default SharedField
