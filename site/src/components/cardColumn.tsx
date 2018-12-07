
import * as React from "react"

export interface ICardColumnData {
  name: string
  subtitle?: string
  description?: string
  icon?: any
  children?: React.ReactNode
  className?: string
}

export interface ICardColumnProps {
  content: ICardColumnData[]
  className?: string
}

class CardColumn extends React.Component<ICardColumnProps, any> {
  public render() {
    return (
      <div className={`columns ${this.props.className}`}>
          {this.props.content.map((cardContent) => (
            <div className={`column ${cardContent.className}`} key={cardContent.name}>
                <div className="is-flex columnDirection centerJustify has-text-centered">
                <div className="highlightOnHover is-flex columnDirection centerJustify">
                  <span className="is-size-1 has-text-info-dark">
                      {cardContent.icon ? <cardContent.icon /> : <span />}
                  </span>
                  <span className="is-size-3 has-text-info">{cardContent.name}</span>
                  {cardContent.description ? (
                    <span className="is-size-5 smallMarginTop has-text-centered">
                      {cardContent.description}
                    </span>
                  ) : null}
                  {cardContent.children}
                  <div className="tohoverover"></div>
                </div>
                </div>
            </div>
          ))}
      </div>
    )
  }
}

export default CardColumn
