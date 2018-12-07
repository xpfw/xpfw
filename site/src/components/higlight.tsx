import SyntaxHighlighter, { registerLanguage } from "react-syntax-highlighter/dist/prism-light"
import typescript from 'react-syntax-highlighter/dist/languages/prism/typescript'
import { coy } from 'react-syntax-highlighter/dist/styles/prism'
import * as React from "react"
import {get} from "lodash"

registerLanguage('ts', typescript);


export interface IHighlightedCode {
  source: string
  className?: string
  language?: string
}

coy["pre[class*=\"language-\"]"].overflow = "scroll -moz-scrollbars-unscrollable"

class HighlightedCode extends React.Component<IHighlightedCode, any> {
  public render() {
    return (
      <SyntaxHighlighter {...this.props} language={get(this.props, "language", "ts")} style={coy}>
        {this.props.source}
      </SyntaxHighlighter>
    )
  }
}

export default HighlightedCode
