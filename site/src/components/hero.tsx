import * as React from "react"



export interface IHero {
  className?: string
  title?: string
  description?: string
  iconConfig?: any
}

class BulmaHero extends React.Component<IHero, any> {
  public render() {
    return (
      <div className={`hero ${this.props.className}`}>
        <div className="hero-body">
          <div className="has-text-centered is-size-1">
            {this.props.iconConfig ? (
              <span className="textIcon has-text-info-dark">
                {this.props.iconConfig ? <this.props.iconConfig /> : <span />}
              </span>
            ) : undefined}
            {this.props.title ? (
              <span className="has-text-primary">
                {this.props.title}
              </span>
            ) : undefined}
          </div>
          {this.props.description ? (
            <div className="has-text-centered">
              <span className=" is-size-4 has-text-info">
                {this.props.description}
              </span>
            </div>
          ) : undefined}
          <div className="marginTop">
            {this.props.children}
          </div>
        </div>
      </div>
    )
  }
}

export default BulmaHero
