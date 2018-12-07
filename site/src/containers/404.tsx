import * as React from 'react'
import PageContainer from '../components/pageContainer';
import BulmaHero from '../components/hero';
import { FaExclamationTriangle } from 'react-icons/fa';

class Page404 extends React.Component<any, any> {
  public render() {
    return (
      <PageContainer {...this.props}>
        <BulmaHero
          className="is-warning"
          title="Couldn't find the page you were looking for"
          iconConfig={FaExclamationTriangle}
        >
        
        </BulmaHero>
      </PageContainer>
    )
  }
}

export default Page404
