import { get, isNil, keys } from "lodash"
import * as React from "react"
import { VictoryAxis, VictoryBar, VictoryChart, VictoryTheme } from "victory"
import { MdFullscreen, MdFullscreenExit } from "react-icons/md"

class WebTimeStepChart extends React.Component<any, any> {
  public render() {
    const data: any[] = []
    const categories = []
    if (!isNil(this.props.stat)) {
      const itemKeys: any = keys(this.props.stat)
      for (const key of itemKeys) {
        categories.push(key)
        data.push({
          y: this.props.stat[key],
          x: key
        })
      }
    }
    const isFullScreen = get(this, "state.fullScreen", false)
    return (
        <VictoryChart
          theme={VictoryTheme.material}
          height={get(global, "window.innerHeight", 1024) * (isFullScreen ? 1 : 0.4)}
          width={get(global, "window.innerWidth", 1024) - (isFullScreen ? 0 : 80)}
        >
          <VictoryBar
            data={data}
          />
          <VictoryAxis />
          <VictoryAxis dependentAxis={true} />
        </VictoryChart>
    )
  }
}

export default WebTimeStepChart
