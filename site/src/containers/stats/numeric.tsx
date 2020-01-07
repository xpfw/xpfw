import { toJS } from "@xpfw/data"
import { StatType } from "@xpfw/dm"
import { useStat } from "@xpfw/dm-shared"
import {get} from "lodash"
import { observer } from "mobx-react-lite"
import * as React from "react"
import WebTimeStepChart from "./timeChart"

const StatShower: React.FunctionComponent<any> = observer((props) => {
  const statHelper = useStat(props.config, props.collection, props.useServer, props.prefix)
  if (get(props, "config.type") === StatType.timeStep) {
    return <WebTimeStepChart {...props} {...statHelper} />
  }
  return (
    <span>{statHelper.stat}</span>
  )
})

export default StatShower
