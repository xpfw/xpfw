import * as React from "react"
import { FaBolt, FaChartLine, FaFeather, FaFileAlt, FaLink, FaPlug, FaRocket, FaServer, FaUsers } from "react-icons/fa"
import { MdSecurity } from "react-icons/md"
import CardColumn from "../../components/cardColumn"
import DemoForm from "../../components/demoForm"
import BulmaHero from "../../components/hero"
import HighlightedCode from "../../components/highlight"
import linkClickHandler from "../../components/linkHandler"
import siteGlobals from "../../globals"

class CoreIntro extends React.Component<any, any> {
  public render() {
    return (
      <div>
        <BulmaHero
          className="is-light"
          title="Supercharge your JSON-Schema!"
          iconConfig={FaRocket}
        >
          <CardColumn
                content={[
                  {
                    name: "Forms",
                    children: (
                      <span className={siteGlobals.contentClass} key="val">
                        <a onClick={linkClickHandler} className={siteGlobals.linkClass} href={"/form.html"}>@xpfw/form</a> renders JSON-Schema into Forms.
                      </span>
                    ),
                    icon: FaFileAlt
                  },
                  {
                    name: "CRUD & Relationships",
                    children: (
                      <span className={siteGlobals.contentClass} key="val">
                        <a onClick={linkClickHandler} className={siteGlobals.linkClass} href={"/data.html"}>@xpfw/data</a> turns your JSON-Schema into a CRUD interface.
                      </span>
                    ),
                    icon: FaUsers
                  },
                  // {
                  //   name: "Stats",
                  //   children: (
                  //     <span className={siteGlobals.contentClass} key="val">
                  //       <a {...siteGlobals.externalLinkConfig} href="/docs/core/permissions.html" className={siteGlobals.linkClass}>@xpfw/dm</a> enables you quick insight into your data through small definitions.
                  //     </span>
                  //   ),
                  //   icon: FaChartLine
                  // },
                  {
                    name: "Permission Support",
                    children: (
                      <span className={siteGlobals.contentClass} key="val">
                        <a {...siteGlobals.externalLinkConfig} href="/docs/stacks/feathers.html" className={siteGlobals.linkClass}>@xpfw/permissions</a> is an optional permission system that can be integrated with any stack.
                      </span>
                    ),
                    icon: MdSecurity
                  }
                ]}
              />
        </BulmaHero>
        <BulmaHero
          className="is-light"
          title="Stack Options"
          iconConfig={FaServer}
        >
          <CardColumn
                content={[
                  {
                    name: "Feathers",
                    children: (
                      <span className={siteGlobals.contentClass} key="val">
                        xpfw comes with support for feathers.
                        Connect to a feathers backend via <a className={siteGlobals.linkClass} href={`${siteGlobals.pkgRoot}data-feathers/`}>
                          @xpfw/data-feathers
                        </a>. For the feathers backend <a className={siteGlobals.linkClass} href={`${siteGlobals.pkgRoot}feathers-hooks/`}>
                          @xpfw/feathers-hooks
                        </a> provides some ready to use hooks.
                        An example of both can be found&nbsp;
                        <a {...siteGlobals.externalLinkConfig} href="/docs/backend/feathers.html">in the docs.</a>
                      </span>
                    ),
                    icon: FaFeather
                  },
                  {
                    name: "NeDB",
                    children: (
                      <span className={siteGlobals.contentClass} key="val">
                        Want an offline app? Use&nbsp;
                        <a className={siteGlobals.linkClass} href={`${siteGlobals.pkgRoot}data-nedb/`}>
                          @xpfw/data-nedb
                        </a> to persist data in the devices storage.
                        The&nbsp;
                        <a {...siteGlobals.externalLinkConfig} href="/docs/backend/nedb.html">example in the documentation</a> will show you how.
                      </span>
                    ),
                    icon: FaBolt
                  },
                  {
                    name: "Connect your stack",
                    children: (
                      <span className={siteGlobals.contentClass} key="val">
                        <a className={siteGlobals.linkClass} href={"/docs/data/ibackendclient.html"}>IBackendClient</a> is an interface through which @xpfw/data can be connected to any backend.
                        The stacks that are already supported are merely suggestions.
                      </span>
                    ),
                    icon: FaPlug
                  },
                  {
                    name: "Integrate",
                    children: (
                      <span className={siteGlobals.contentClass} key="val">
                        Integrating xpfw into your backend is a matter of adding two function calls to your code.&nbsp;
                        Use <a className={siteGlobals.linkClass} href={"/docs/core/backend.html"}>jsonValidator.validate</a> from @xpfw/form for schema validation&nbsp;
                        and <a className={siteGlobals.linkClass} href={"/docs/core/backend.html"}>validatePermission</a> from @xpfw/permission for permisson checks.
                      </span>
                    ),
                    icon: FaLink
                  }
                ]}
              />

        </BulmaHero>
      </div>
    )
  }
}

export default CoreIntro
