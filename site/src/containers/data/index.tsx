import { BackendClient } from "@xpfw/data"
import NedbClient from "@xpfw/data-nedb"
import nedb from "nedb"
NedbClient.instanceCreator = nedb
BackendClient.client = NedbClient
import { registerComponents } from "@xpfw/form-bulma"
registerComponents()
import { registerComponents as regUiComp } from "@xpfw/data-bulma"
regUiComp()

import * as React from "react"
import { FaListAlt, FaPenSquare, FaPlusCircle, FaReact, FaUndo, FaUsers, FaUsersCog } from "react-icons/fa"
import CardColumn from "../../components/cardColumn"
import BulmaHero from "../../components/hero"
import HighlightedCode from "../../components/highlight"
import PageContainer from "../../components/pageContainer"
import MiniCreate from "../../components/ui/create"
import ChangeableMiniEdit from "../../components/ui/edit"
import UiList, { resetData } from "../../components/ui/list"
import siteGlobals, { TagCollectionModel, TagModel } from "../../globals"
import { relationshipCode } from "../home/actualCode"

const convertTextToNedbRegex: any = (value: any) => {
  return {
      $regex: new RegExp(`(.*?)${value}(.*?)`, "ig")
  }
}

const CreateNative = require("../../components/native-create.png").default
const EditNative = require("../../components/native-edit.png").default
const ListNative = require("../../components/native-list.png").default

const tc: any = TagModel.collection
const tlc: any = TagCollectionModel.collection
class UiPage extends React.Component<any, any> {
  public render() {
    return (
      <PageContainer {...this.props}>
        <BulmaHero
          className="is-light"
          title="Relationships with fields"
          iconConfig={FaUsers}
        >
          <div className="has-text-centered is-size-5 pullUpMargin">
            Below is an example of using&nbsp;
            <a target="_blank" className={siteGlobals.linkClass} href={`${siteGlobals.pkgRoot}data-bulma`}>
            @xpfw/data-bulma
            </a> with a relational model. At the bottom are Tag Collections which have a ManyToMany relationship to the Tags right below.
          </div>
          <div style={{marginTop: "3.8rem"}}>
            <CardColumn
                  content={[
                    {
                      name: "Add Tag",
                      children: (
                        <div>
                          Create a tag that will be addable to a Tag Collection.
                          <MiniCreate schema={TagModel} prefix="createTag" />
                        </div>
                      ),
                      className: "is-one-quarter",
                      icon: FaPlusCircle
                    },
                    {
                      name: "See Tags",
                      children: (
                        <div>
                          <div className="is-flex centerJustify smallMarginBottom">
                          Check which Tags can be searched for in the Tag Collection Relationship Field.
                          <a className="button" onClick={async () => {
                            console.log("ABOUT TO RESET TAGS")
                            await resetData(TagModel)
                            console.log("REST")
                          }}>
                            <FaUndo />Reset Data
                          </a>
                          </div>
                          <UiList collection={tc} />
                        </div>
                      ),
                      className: "is-half",
                      icon: FaListAlt
                    },
                    {
                      name: "Modify a Tag",
                      children: (
                        <div>
                          Select a Tag from the list to edit it here
                          <ChangeableMiniEdit schema={TagModel} />
                        </div>
                      ),
                      className: "is-one-quarter",
                      icon: FaPenSquare
                    }
                  ]}
                />
                <CardColumn
                      className="marginTopBig"
                      content={[
                        {
                          name: "Add a Tag Collection",
                          children: (
                            <div>
                              Create Tag Collections that have relationships to the Tags above
                              <MiniCreate schema={TagCollectionModel} prefix="createCol" />
                            </div>
                          ),
                          className: "is-one-quarter",
                          icon: FaPlusCircle
                        },
                        {
                          name: "Related lists",
                          children: (
                            <div>
                              <div className="is-flex centerJustify smallMarginBottom">
                              Just like in the search _id is resolved to a name display &nbsp;
                              <a className="button" onClick={async () => {
                                await resetData(TagCollectionModel)
                              }}>
                                <FaUndo />Reset Data
                              </a>
                              </div>
                              <UiList collection={tlc} />
                            </div>
                          ),
                          className: "is-half",
                          icon: FaListAlt
                        },
                        {
                          name: "Alter a Collection",
                          children: (
                            <div>
                              Select an Item from the list to edit it here
                              <ChangeableMiniEdit schema={TagCollectionModel} />
                            </div>
                          ),
                          className: "is-one-quarter",
                          icon: FaPenSquare
                        }
                      ]}
                    />
              </div>
        </BulmaHero>
        <BulmaHero
          className="is-light"
          title="All driven by this little definition"
          iconConfig={FaUsersCog}
        >
          <HighlightedCode className="code-container" source={relationshipCode} />
        </BulmaHero>
        <BulmaHero
          className="is-light"
          title="React Native support"
          iconConfig={FaReact}
        >
        <div className="has-text-centered is-size-5 pullUpMargin">
          Here are some screenshots of using&nbsp;
          <a target="_blank" className={siteGlobals.linkClass} href={`${siteGlobals.pkgRoot}data-native`}>
          @xpfw/data-native
          </a>.
        </div>

        <CardColumn
                      className="marginTopBig"
                      content={[
                        {
                          name: "Create",
                          children: (
                            <img src={CreateNative} alt="Screenshot of @xpfw/data-native's create component" />
                          ),
                          className: "is-one-third",
                          icon: FaPlusCircle
                        },
                        {
                          name: "List",
                          children: (
                            <img src={ListNative} alt="Screenshot of @xpfw/data-native's list component" />
                          ),
                          className: "is-one-third",
                          icon: FaListAlt
                        },
                        {
                          name: "Edit",
                          children: (
                            <img src={EditNative} alt="Screenshot of @xpfw/data-native's edit component" />
                          ),
                          className: "is-one-third",
                          icon: FaPenSquare
                        }
                      ]}
                    />
        </BulmaHero>
      </PageContainer>
    )
  }
}

export default UiPage
