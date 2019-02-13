import { get } from "lodash"

const setFromEvent = (thisRef: {props: {setValue: any}}, eventKey: string) => {
  return (e: any) => {
    thisRef.props.setValue(get(e, eventKey))
  }
}

export { setFromEvent }
