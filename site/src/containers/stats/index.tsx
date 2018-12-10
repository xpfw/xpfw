import { registerComponents } from '@xpfw/form-bulma';
registerComponents()

import * as React from 'react'
import PageContainer from '../../components/pageContainer';
import WrappedStatShower from "./numeric"
import { TagCollectionModel } from "../../globals"
import WebDateRangePicker from "./dateRangePicker"

class StatsPage extends React.Component<any, any> {
  public render() {
    return (
      <PageContainer {...this.props}>
        <WebDateRangePicker />
        <WrappedStatShower
          configId={"Some"}
          collection={TagCollectionModel.collection}
        />
        <WrappedStatShower
          configId={"Average"}
          collection={TagCollectionModel.collection}
        />
        <WrappedStatShower
          configId={"timeDistance"}
          collection={TagCollectionModel.collection}
        />
        <WrappedStatShower
          configId={"timeStepson"}
          collection={TagCollectionModel.collection}
        />
        <WrappedStatShower
          configId={"timeStepMean"}
          collection={TagCollectionModel.collection}
        />
        <WrappedStatShower
          configId={"timeSteppedDistance"}
          collection={TagCollectionModel.collection}
        />
      </PageContainer>
    )
  }
}

export default StatsPage
