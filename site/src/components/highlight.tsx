import {get} from "lodash"
import * as React from "react"
import typescript from "react-syntax-highlighter/dist/esm/languages/prism/typescript"
import SyntaxHighlighter from "react-syntax-highlighter/dist/esm/prism-light"
import { coy } from "react-syntax-highlighter/dist/esm/styles/prism"

SyntaxHighlighter.registerLanguage("ts", typescript)

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
