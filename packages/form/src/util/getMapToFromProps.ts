import { IFieldProps } from "../store/componentRegistry"

const getMapToFromProps = (props: IFieldProps) => {
  return props.mapTo ? props.mapTo : String(props.schema.title)
}

export default getMapToFromProps