import * as React from 'react'
import BulmaHero from '../../components/hero';
import CardColumn from '../../components/cardColumn';
import DemoForm from '../../components/demoForm';
import HighlightedCode from '../../components/higlight';
import siteGlobals from '../../globals';
import { MdSpellcheck, MdSecurity } from 'react-icons/md';
import { FaFileAlt, FaUsers, FaPlug, FaFeather, FaBolt, FaServer } from 'react-icons/fa';
import linkClickHandler from '../../components/linkHandler';

class CoreIntro extends React.Component<any, any> {
  public render() {
    return (
      <div>
        <BulmaHero
          className="is-light"
          title="Versatile Validation"
          iconConfig={MdSpellcheck}
        >
          <CardColumn
                content={[
                  {
                    name: "Form Definitions",
                    children: (
                      <span className={siteGlobals.contentClass} key="val">
                        Flexible <a {...siteGlobals.externalLinkConfig} href="/docs/core/definitions.html">Form definitions</a> allow all higher level packages to do as much as possible automatically.
                      </span>
                    ),
                    icon: FaFileAlt
                  },
                  {
                    name: "Relationships",
                    children: (
                      <span className={siteGlobals.contentClass} key="val">
                        <a onClick={linkClickHandler} className={siteGlobals.linkClass} href={"/ui.html"}>@xpfw/ui</a> shows how relationships are modeled in definitions.
                      </span>
                    ),
                    icon: FaUsers
                  },
                  {
                    name: "Permission Support",
                    children: (
                      <span className={siteGlobals.contentClass} key="val">
                        There's an optional permission system <a {...siteGlobals.externalLinkConfig} href="/docs/core/permissions.html">explained in the docs</a>, thats helpful if used in a backend.
                      </span>
                    ),
                    icon: MdSecurity
                  },
                  {
                    name: "Roll your own stack",
                    children: (
                      <span className={siteGlobals.contentClass} key="val">
                        <a className={siteGlobals.linkClass} href={`${siteGlobals.pkgRoot}xpfw-validate/`}>@xpfw/validate</a>&nbsp;
                        exports <a className={siteGlobals.linkClass} href={"/docs/core/backend.html"}>validateForm</a>&nbsp;
                        and <a className={siteGlobals.linkClass} href={"/docs/core/backend.html"}>validatePermission</a> to allow quick intergration into your own existing backend.
                        Need to connect the UI as well? Check out <a className={siteGlobals.linkClass} href={"/docs/ui/ibackendclient.html"}>IBackendClient</a>.
                      </span>
                    ),
                    icon: FaPlug
                  }
                ]}
              />
        </BulmaHero>
        <BulmaHero
          className="is-light"
          title="Readily Usable Stacks"
          iconConfig={FaServer}
        >
          <div className="has-text-centered is-size-4 pullUpMargin">
            If you don't wish to adapt <i>xpfw</i> to your needs you can use the following <i>backend</i> suggestions, which work out of the box.
          </div>
          <CardColumn
                content={[
                  {
                    name: "Feathers",
                    children: (
                      <span className={siteGlobals.contentClass} key="val">
                        Have a full stack ready and waiting by using&nbsp;
                        <a className={siteGlobals.linkClass} href={`${siteGlobals.pkgRoot}xpfw-feathers/`}>
                          @xpfw/feathers
                        </a> hooks in a feathers application.
                        Connect to it via&nbsp;
                        <a className={siteGlobals.linkClass} href={`${siteGlobals.pkgRoot}xpfw-ui-feathers/`}>
                          @xpfw/ui-feathers
                        </a>.
                        A full example can be found&nbsp;
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
                        <a className={siteGlobals.linkClass} href={`${siteGlobals.pkgRoot}xpfw-feathers/`}>
                          @xpfw/ui-nedb
                        </a> to persist data in localStorage!
                        Read&nbsp;
                        <a {...siteGlobals.externalLinkConfig} href="/docs/backend/nedb.html">the example in the documentation</a> if you're curious!
                      </span>
                    ),
                    icon: FaBolt
                  }
                ]}
              />
          
        </BulmaHero>
      </div>
    )
  }
}

export default CoreIntro
