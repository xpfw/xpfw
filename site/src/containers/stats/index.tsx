import { registerComponents } from '@xpfw/form-bulma';
registerComponents()

import * as React from 'react'
import PageContainer from '../../components/pageContainer';
import WrappedStatShower from "./numeric"
import { TagCollectionModel } from "../../globals"
import WebDateRangePicker from "./dateRangePicker"
import CardColumn from "../../components/cardColumn"
import { FaChartPie, FaFileAlt, FaSortNumericDown, FaClock, FaCogs } from "react-icons/fa"
import siteGlobals from "../../globals"
import BulmaHero from '../../components/hero';
import HighlightedCode from '../../components/higlight';
import { statCode } from '../home/actualCode';

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
                    configId={"Some"}
                    collection={TagCollectionModel.collection}
                  /><br />
                  Average:
                  <WrappedStatShower
                    configId={"Average"}
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
                    configId={"timeStepson"}
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
            },
          ]} />
        </BulmaHero>
        <BulmaHero
          className="is-light"
          title="All driven by this little definition"
          iconConfig={FaFileAlt}
        >
          <HighlightedCode className="code-container" source={statCode} />
        </BulmaHero>
      </PageContainer>
    )
  }
}

export default StatsPage
