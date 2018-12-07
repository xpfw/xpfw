import { registerComponents } from '@xpfw/form-bulma';
registerComponents()

import * as React from 'react'
import ModularityInfo from './modularity';
import PageContainer from '../../components/pageContainer';
import UiIntro from './uiIntro';
import { basicFormCode } from './actualCode';
import HighlightedCode from '../../components/higlight';
import BulmaHero from '../../components/hero';
import { FaFileAlt } from 'react-icons/fa';

class Home extends React.Component<any, any> {
  public render() {
    return (
      <PageContainer {...this.props}>
        <UiIntro />
        <ModularityInfo />
        <BulmaHero
          className="is-light"
          title="All driven by one definition"
          iconConfig={FaFileAlt}
        >
          <HighlightedCode className="code-container" source={basicFormCode} />
        </BulmaHero>
      </PageContainer>
    )
  }
}

export default Home
