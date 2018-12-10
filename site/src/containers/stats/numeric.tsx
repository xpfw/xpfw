import * as React from "react"
import { SharedStatWrapper } from "@xpfw/dm-shared"
import { StatType } from "@xpfw/validate"
import {get} from "lodash"
import WebTimeStepChart from "./timeChart"

class StatShower extends React.Component<any, any> {
  public render() {
    if (get(this.props, "config.type") === StatType.timeStep) {
      return <WebTimeStepChart {...this.props} />
    }
    return (
      <span>{this.props.stat}</span>
    )
  }
}
const WrappedStatShower = SharedStatWrapper(StatShower)
export default WrappedStatShower