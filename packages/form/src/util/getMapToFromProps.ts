import { ExtendedJSONSchema } from "../jsonschema";
import { IFieldProps } from "../store/componentRegistry"

const getMapToFromProps = (props: IFieldProps) => {
  return props.mapTo ? props.mapTo : String(props.schema.title)
}

const getMapTo = (schema: ExtendedJSONSchema, mapTo?: string) => getMapToFromProps({mapTo, schema})

export default getMapToFromProps
export {
  getMapTo
}
