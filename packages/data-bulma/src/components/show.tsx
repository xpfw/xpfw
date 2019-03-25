import { IGetHookProps, useGetWithProps } from "@xpfw/data"
import { observer } from "mobx-react-lite"
import * as React from "react"

const BulmaShow: React.FunctionComponent<IGetHookProps> = observer((props) => {
  const getProps = useGetWithProps(props)
  return (
    <span>
      {JSON.stringify(getProps.item)}
    </span>
  )
})

export default BulmaShow
