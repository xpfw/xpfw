import { SharedField } from "@xpfw/form"
import { FieldType } from '@xpfw/validate'
import * as React from "react"
import { FaPaintBrush } from "react-icons/fa"
import BulmaHero from "../../components/hero"
import HighlightedCode from "../../components/highlight"
import siteGlobals from "../../globals"
import "./theme"

class ThemeExample extends React.Component<any, any> {
  public render() {
    return (
      <BulmaHero
        className="is-light"
        title="Made to be customized"
        iconConfig={FaPaintBrush}
      >
        <div className="has-text-centered is-size-4 pullUpMargin">
          <a className={siteGlobals.externalLinkConfig.className} href="/docs/form/theming.html">
            Theming
          </a> is achieved through <a target="_blank" className={siteGlobals.externalLinkConfig.className} href="https://reactjs.org/docs/hooks-overview.html">
            react hooks
          </a> that provide all the data you need.
        </div>
        <SharedField schema={{title: "myGuidedNumber", type: "number", theme: "guided"}} theme="guided" />
        <HighlightedCode
          className="code-container"
          source={`import { ComponentRegistry, FormStore, IFieldProps, memo, useFieldWithValidation } from "@xpfw/form"
import { observer } from "mobx-react-lite"
import * as React from "react"

const GuidedNumbersField: React.FunctionComponent<IFieldProps> = observer((props) => {
  const fieldProps = useFieldWithValidation(props.schema, props.mapTo, props.prefix)
  const memoVals = [props.mapTo, props.prefix, JSON.stringify(props.schema)]
  const randomize = memo(() => () => fieldProps.setValue(Math.round(Math.random() * 100)), memoVals)
  React.useEffect(randomize, memoVals)
  return (
    <div className="is-flex centerJustify has-text-centered is-size-5 marginTop marginBottom">
      <a className="button" onClick={() => {
        fieldProps.setValue(fieldProps.value - 1)
      }}>Decrease</a>
      <span style={{marginRight: "1rem", marginLeft: "1rem"}}>Value of <i>{props.schema.title}</i> is: <b>{fieldProps.value}</b></span>
      <a className="button" onClick={() => {
        fieldProps.setValue(fieldProps.value + 1)
      }}>Increase</a><a style={{marginLeft: "1rem"}} className="button" onClick={randomize}>Randomize</a>
    </div>
  )
})

ComponentRegistry.registerComponent("number", GuidedNumbersField, "guided")
          `}
        />
      </BulmaHero>
    )
  }
}

export default ThemeExample
