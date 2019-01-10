import * as React from 'react'
import BulmaHero from '../../components/hero';
import CardColumn from '../../components/cardColumn';
import DemoForm from '../../components/demoForm';
import HighlightedCode from '../../components/higlight';
import siteGlobals from '../../globals';
import { FaReact } from 'react-icons/fa';

class FormIntro extends React.Component<any, any> {
  public render() {
    return (
      <div>
        <BulmaHero
          className="is-light"
          title="Concise form rendering with validation"
          iconConfig={FaReact}
        >
        <div className="has-text-centered is-size-4 pullUpMargin">
            Fields&nbsp;
            <a className={siteGlobals.externalLinkConfig.className} href="/docs/form/theming.html">
              can easily be themed
            </a>
            &nbsp;on a per &nbsp;
            <a className={siteGlobals.externalLinkConfig.className} href="/docs/core/definitions.html">
              type
            </a> basis. Prebuilt <a className={siteGlobals.externalLinkConfig.className} href="/docs/testing.html">
            &nbsp;includable jest tests&nbsp;
            </a> will help ease your mind.
          </div>
          <CardColumn
                className="marginTopBig"
                content={[
                  {
                    name: "Web",
                    children: (
                      <div>
                          Uses <a target="_blank" className={siteGlobals.linkClass} href={`${siteGlobals.pkgRoot}xpfw-form-bulma`}>
            @xpfw/form-bulma
            </a>
                          <HighlightedCode className="code-container" source={`import { IForm, getFieldsFromForm } from "@xpfw/validate"
import { SharedField } from "@xpfw/form-shared"
import { registerComponents } from "@xpfw/form-bulma"
// Making sure that @xpfw/form-shared can find components
registerComponents()
class FormRenderer extends React.Component<{
  form: IForm
}, any> {
  public render() {
    const fieldDefs = getFieldsFromForm(this.props.form)
    const fields = fieldDefs.map((field: IField) => {
      return <SharedField key={field.mapTo} field={field} />
    })
    return (
      <div>
        {fields}
      </div>
    )
  }
}`}
                        />
                        <DemoForm />
                      </div>
                    )
                  },
                  {
                    name: "Native",
                    children: (
                      <div>
                        Uses <a target="_blank" className={siteGlobals.linkClass} href={`${siteGlobals.pkgRoot}xpfw-form-native`}>
                          @xpfw/form-native
                        </a>
                        <HighlightedCode className="code-container" source={`import { IForm, getFieldsFromForm } from "@xpfw/validate"
import { SharedField } from "@xpfw/form-shared"
import { registerComponents } from "@xpfw/form-native"
import { View } from "react-native"
import { Link } from 'react-static';
// Making sure that @xpfw/form-shared can find components
registerComponents()
class FormRendererNative extends React.Component<{
form: IForm
}, any> {
  public render() {
    const fieldDefs = getFieldsFromForm(this.props.form)
    const fields = fieldDefs.map((field: IField) => {
      return <SharedField key={field.mapTo} field={field} />
    })
    return (
      <View>
        {fields}
      </View>
    )
  }
}`}
                      />
                    </div>
                    )
                  }
                ]}
              />
        </BulmaHero>
      </div>
    )
  }
}

export default FormIntro
