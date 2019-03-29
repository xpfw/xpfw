import { registerComponents } from "@xpfw/form-bulma"
registerComponents()

import * as React from "react"
import { FaMagic } from "react-icons/fa"
import BulmaHero from "../../components/hero"
import linkClickHandler from "../../components/linkHandler"
import PageContainer from "../../components/pageContainer"
import siteGlobals from "../../globals"
import FormIntro from "./formIntro"
import ThemeExample from "./themeExample"

class FormPage extends React.Component<any, any> {
  public render() {
    return (
      <PageContainer {...this.props}>
        <FormIntro />
        <ThemeExample />
        <BulmaHero
          className="is-light"
          title="Need more automation?"
          iconConfig={FaMagic}
        >
        <div className="has-text-centered is-size-4 pullUpMargin">
          Check out
          <a onClick={linkClickHandler} className={siteGlobals.linkClass} href={"/ui.html"}>
          @xpfw/ui
          </a>. It comes with backend independent CRUD UI's.
        </div>
        </BulmaHero>
      </PageContainer>
    )
  }
}

export default FormPage
