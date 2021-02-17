import { registerComponents } from '@xpfw/form-bulma';
registerComponents()

import React from 'react'
import PageContainer from '../../components/pageContainer';
import CoreIntro from './coreIntro';

class FormPage extends React.Component<any, any> {
  public render() {
    return (
      <PageContainer {...this.props}>
        <CoreIntro />
      </PageContainer>
    )
  }
}

export default FormPage
