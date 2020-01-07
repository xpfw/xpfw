import { registerComponents } from "@xpfw/form-bulma"
registerComponents()

import * as React from "react"
import { FaChartPie, FaClock, FaCogs, FaFileAlt, FaSortNumericDown } from "react-icons/fa"
import CardColumn from "../../components/cardColumn"
import BulmaHero from "../../components/hero"
import HighlightedCode from "../../components/highlight"
import PageContainer from "../../components/pageContainer"
import siteGlobals, { TagCollectionModel, TagCollectionStats } from "../../globals"
import { statCode } from "../home/actualCode"
import WebDateRangePicker from "./dateRangePicker"
import WrappedStatShower from "./numeric"

class StatsPage extends React.Component<any, any> {
  public render() {
    return (
      <PageContainer {...this.props}>
        <BulmaHero
          className="is-light"
          title="Easy stats"
          iconConfig={FaChartPie}
        >
        <CardColumn
          content={[
            {
              name: "Numeric",
              children: (
                <span className={siteGlobals.contentClass} key="val">
                  Sum: <WrappedStatShower
                    config={TagCollectionStats[0]}
                    collection={TagCollectionModel.collection}
                  /><br />
                  Average: <WrappedStatShower
                    config={TagCollectionStats[1]}
                    collection={TagCollectionModel.collection}
                  /><br />
                  Average Time Distance between Events: <WrappedStatShower
                    config={TagCollectionStats[2]}
                    collection={TagCollectionModel.collection}
                  />
                </span>
              ),
              icon: FaSortNumericDown
            },
            {
              name: "Time series",
              children: (
                <span className={siteGlobals.contentClass} key="val">
                  <WrappedStatShower
                    config={TagCollectionStats[3]}
                    collection={TagCollectionModel.collection}
                  />
                </span>
              ),
              icon: FaClock
            },
            {
              name: "Control timeframe",
              children: (
                <span className={siteGlobals.contentClass} key="val">
                  <WebDateRangePicker />
                </span>
              ),
              icon: FaCogs
            }
          ]} />
        </BulmaHero>
        <BulmaHero
          className="is-light"
          title="All driven by one JSON definition"
          iconConfig={FaFileAlt}
        >
          <HighlightedCode className="code-container" source={statCode} />
        </BulmaHero>
      </PageContainer>
    )
  }
}

export default StatsPage
