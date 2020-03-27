import { IFieldProps } from "../store/componentRegistry"
import { get } from "lodash"

const getLabelFromProps = (props: IFieldProps) => {
  return get(props, "label", get(props, "schema.label", get(props, "schema.title")))
}

export default getLabelFromProps