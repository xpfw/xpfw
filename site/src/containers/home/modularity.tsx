import * as React from 'react'
import CardColumn from '../../components/cardColumn';
import BulmaHero from '../../components/hero';
import siteGlobals from '../../globals';
import { FaWpforms } from 'react-icons/fa';
import { MdWbIncandescent, MdSpellcheck } from 'react-icons/md';
import { GoServer, GoPackage } from 'react-icons/go';
import linkClickHandler from '../../components/linkHandler';

class ModularityInfo extends React.Component<any, any> {
  public render() {
    return (
      <BulmaHero
        className="is-light"
        title="Modular packages for cross platform developement"
        iconConfig={GoPackage}
      >
        <CardColumn
              content={[
                {
                  name: "Simple Validation",
                  children: (
                    <span className={siteGlobals.contentClass} key="val">
                      The root package is
                      <a onClick={linkClickHandler} className={siteGlobals.linkClass} href={"/core.html"}>@xpfw/validate</a><br />
                      It's kind of like&nbsp;
                      <a {...siteGlobals.externalLinkConfig} href="http://json-schema.org/">JSON-Schema</a>
                      &nbsp;but includes <span className="is-italic">relationship and permission options</span> similar to&nbsp;
                      <a {...siteGlobals.externalLinkConfig} href="https://docs.silverstripe.org/en/4/developer_guides/model/relations/">
                        Silverstripes DbObject
                      </a>.
                    </span>
                  ),
                  icon: MdSpellcheck
                },
                {
                  name: "Easy Forms",
                  children: (
                    <span className={siteGlobals.contentClass}>
                      <a onClick={linkClickHandler} className={siteGlobals.linkClass} href={"/form.html"}>@xpfw/form</a> lets you display and customize forms based on @xpfw/validate <a className={siteGlobals.linkClass} href={"/docs/core/definitions.html"}>definitions</a>.<br />
                      This is comparable to&nbsp;
                      <a {...siteGlobals.externalLinkConfig} href="https://mozilla-services.github.io/react-jsonschema-form/">react-jsonschema-form</a>
                      &nbsp;or&nbsp;
                      <a {...siteGlobals.externalLinkConfig} href="https://github.com/aldeed/meteor-autoform">Meteor's autoform</a>, &nbsp;but it also supports React Native out of the box.
                    </span>
                  ),
                  icon: FaWpforms
                },
                {
                  name: "Admin / CMS Ready",
                  children: (
                    <span className={siteGlobals.contentClass}>
                      <a onClick={linkClickHandler} className={siteGlobals.linkClass} href={"/ui.html"}>@xpfw/ui</a>  like <a {...siteGlobals.externalLinkConfig} href="https://www.meteor.com/">Meteor</a> abstracts simple CRUD and paginated Lists for collections and comes with readily usable React UI.<br />
                      Think of <a {...siteGlobals.externalLinkConfig} href="https://github.com/marmelab/react-admin">react-admin</a> written for @xpfw/validate <a onClick={linkClickHandler}  className={siteGlobals.linkClass} href={"/docs/core/definitions.html"}>definitions</a>.
                    </span>
                  ),
                  icon: MdWbIncandescent
                },
                {
                  name: "Backend Independent",
                  children: (
                    <span className={siteGlobals.contentClass}><a onClick={linkClickHandler} {...siteGlobals.externalLinkConfig} href="/ui.html">@xpfw/ui</a> has been written backend independently.<br />
                    Simply implement <a className={siteGlobals.linkClass} href={`${siteGlobals.webRoot}docs/ui/ibackendclient.html`}>IBackendClient</a> or use existing ones like <a className={siteGlobals.linkClass} href={"/docs/stacks/feathers.html"}>feathers</a>.</span>
                  ),
                  icon: GoServer
                }
              ]}
            />
      </BulmaHero>
    )
  }
}

export default ModularityInfo
