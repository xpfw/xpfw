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
      <div className="card">
        <div className="card-content">
          <div className="flex1">
            <div className="flex1"><b>{this.props.config.id}</b></div>
            <span>{this.props.stat}</span>
          </div>
        </div>
      </div>
    )
  }
}
const WrappedStatShower = SharedStatWrapper(StatShower)
export default WrappedStatShower