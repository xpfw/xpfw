import * as React from 'react';
import BulmaHero from '../../components/hero';
import siteGlobals from '../../globals';
import { SharedField } from '@xpfw/form-shared';
import HighlightedCode from '../../components/higlight';
import { FieldType } from '@xpfw/validate';
import "./theme"
import { FaPaintBrush } from 'react-icons/fa';

class ThemeExample extends React.Component<any, any> {
  public render() {
    return (
      <BulmaHero
        className="is-light"
        title="Easy Customization"
        iconConfig={FaPaintBrush}
      >
      <div className="has-text-centered is-size-4 pullUpMargin">
        <a className={siteGlobals.externalLinkConfig.className} href="/docs/form/theming.html">
          Theming a type
        </a> is achievable with a simple <a target="_blank" className={siteGlobals.externalLinkConfig.className} href="https://reactjs.org/docs/react-component.html">
          React Component
        </a>.
      </div>
      <SharedField field={{mapTo: "myGuidedNumber", type: FieldType.Number}} theme="guided" />
      <HighlightedCode className="code-container" source={`import * as React from 'react'
import { IFieldProps, ComponentRegistry } from '@xpfw/form-shared'
import { FieldType } from '@xpfw/validate';
class GuidedNumbersField extends React.Component<IFieldProps, any> {
  public randomize() {
    this.props.setValue(Math.round(Math.random() * 100))
  }
  public componentWillMount() {
    this.randomize()
  }
  public render() {
    return (
      <div className="is-flex centerJustify has-text-centered is-size-5 marginTop marginBottom">
        <a className="button" onClick={() => {
          this.props.setValue(this.props.value - 1)
        }}>Decrease</a>
        <span style={{marginRight: "1rem", marginLeft: "1rem"}}>Value of <i>{this.props.field.mapTo}</i> is: <b>{this.props.value}</b></span>
        <a className="button" onClick={() => {
          this.props.setValue(this.props.value + 1)
        }}>Increase</a><a style={{marginLeft: "1rem"}} className="button" onClick={() => {
          this.randomize()
        }}>Randomize</a>
      </div>
    )
  }
}
ComponentRegistry.registerComponent(FieldType.Number, GuidedNumbersField, "guided")`} />
    </BulmaHero>
    )
  }
}

export default ThemeExample
