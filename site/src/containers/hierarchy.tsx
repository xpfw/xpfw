import * as React from 'react'
import { MdNetworkWifi } from 'react-icons/md';

class Home extends React.Component<any, any> {
  public render() {
    return (
      <div>
        <div className="hero is-light">
          <div className="hero-body">
            <div className="has-text-centered is-size-2 marginBottom">
              <span className="has-text-success">
                <MdNetworkWifi />
              </span>
              <span>
                Package Hierarchy
              </span>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Home
