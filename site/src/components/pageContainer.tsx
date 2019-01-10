import * as React from 'react'
import Menu from './menu';
import { FaHeart, FaGithub, FaCode, FaBalanceScale } from "react-icons/fa"
import siteGlobals from '../globals';
import linkClickHandler from './linkHandler';

class PageContainer extends React.Component<any, any> {
  public render() {
    return (
      <div className="is-flex columnDirection">
        <Menu {...this.props} />
        {this.props.children}
        <div className="is-flex" />
        <footer className="footer" style={{padding: "1rem"}}>
          <div className="container">
            <div className="content has-text-centered">
              <p>
              <strong>xpfw </strong>
              <span>
              made with<span className="icon">
                  <FaHeart className="textIcon has-text-danger"  /></span>&nbsp;by
              <a href="https://github.com/hizoul" target="_blank">
                <span className="icon">
                  <FaGithub className="textIcon" /></span>hizoul
              </a>
              .
              </span>
                <a href={siteGlobals.gitRoot} target="_blank">
                  <span className="icon">
                  <FaCode className="textIcon" /></span><span>Source code</span>
                </a> is distributed under the
                <a href="https://opensource.org/licenses/mit-license.php" target="_blank">
                  <span className="icon">
                  <FaBalanceScale className="textIcon" /></span> MIT
                </a> License.<br />
                <a onClick={linkClickHandler} href="/licenses.html" >Open source licenses</a>
              </p>
            </div>
          </div>
        </footer>
      </div>
    )
  }
}

export default PageContainer
