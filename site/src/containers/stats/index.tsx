import { registerComponents } from '@xpfw/form-bulma';
registerComponents()

import * as React from 'react'
import PageContainer from '../../components/pageContainer';

class StatsPage extends React.Component<any, any> {
  public render() {
    return (
      <PageContainer {...this.props}>
        <div>
These are stats
        </div>
      </PageContainer>
    )
  }
}

export default StatsPage
