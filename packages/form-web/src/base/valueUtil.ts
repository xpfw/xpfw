import { get } from "lodash"

const setFromEvent = (setValue: any, eventKey: string) => {
  return (e: any) => {
    setValue(get(e, eventKey))
  }
}

export { setFromEvent }
