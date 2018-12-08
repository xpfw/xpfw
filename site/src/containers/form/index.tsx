import { registerComponents } from '@xpfw/form-bulma';
registerComponents()

import * as React from 'react'
import PageContainer from '../../components/pageContainer';
import BulmaHero from '../../components/hero';
import FormIntro from './formIntro';
import siteGlobals from '../../globals';
import ThemeExample from './themeExample';
import { FaMagic } from 'react-icons/fa';

class FormPage extends React.Component<any, any> {
  public render() {
    return (
      <PageContainer {...this.props}>
        <FormIntro />
        <ThemeExample />
        <BulmaHero
          className="is-light"
          title="Need more automation?"
          iconConfig={FaMagic}
        >
        <div className="has-text-centered is-size-4 pullUpMargin">
          Check out 
          <a className={siteGlobals.linkClass} href={"/ui.html"}>
          @xpfw/ui
          </a>. It enables with backend independent CRUD UI's.
        </div>
        </BulmaHero>
      </PageContainer>
    )
  }
}

export default FormPage
