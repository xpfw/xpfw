import { BackendClient, ListStore } from '@xpfw/ui-shared';
import NedbClient from '@xpfw/ui-nedb';
BackendClient.client = NedbClient
import { registerComponents } from '@xpfw/form-bulma';
registerComponents()
import { registerComponents as regUiComp } from '@xpfw/ui-bulma';
regUiComp()


import * as React from 'react'
import BulmaHero from '../../components/hero';
import CardColumn from '../../components/cardColumn';
import UiList, { resetData } from '../../components/ui/list';
import ChangeableMiniEdit from '../../components/ui/edit';
import MiniCreate from "../../components/ui/create";
import siteGlobals, { TagModel, TagCollectionModel } from '../../globals';
import PageContainer from '../../components/pageContainer'
import { fieldConverter } from '@xpfw/validate';
import HighlightedCode from '../../components/higlight';
import { relationshipCode } from '../home/actualCode';
import { get } from "lodash"
import { FaUsers, FaPlusCircle, FaListAlt, FaPenSquare, FaUndo, FaReact, FaUsersCog } from 'react-icons/fa';

const convertTextToNedbRegex: any = (value: any) => {
  return {
      $regex: new RegExp(`(.*?)${value}(.*?)`, "ig")
  }
}

fieldConverter.textRegex = convertTextToNedbRegex
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
            <a target="_blank" className={siteGlobals.linkClass} href={`${siteGlobals.pkgRoot}xpfw-ui-bulma`}>
            @xpfw/ui-bulma
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
                          <MiniCreate form={TagModel} prefix="create" />
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
                            await resetData(TagModel)
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
                          Select an Tag from the list to edit it here
                          <ChangeableMiniEdit form={TagModel} />
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
                              <MiniCreate form={TagCollectionModel} prefix="create" />
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
                              <ChangeableMiniEdit form={TagCollectionModel} />
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
          title="React Native support"
          iconConfig={FaReact}
        >
        <div className="has-text-centered is-size-5 pullUpMargin">
          Here are some screenshots of using&nbsp;
          <a target="_blank" className={siteGlobals.linkClass} href={`${siteGlobals.pkgRoot}xpfw-ui-native`}>
          @xpfw/ui-native
          </a>.
        </div>
        
        <CardColumn
                      className="marginTopBig"
                      content={[
                        {
                          name: "Add a Tag Collection",
                          children: (
                            <div>
                              screen
                            </div>
                          ),
                          className: "is-one-quarter",
                          icon: FaPlusCircle
                        },
                        {
                          name: "Related lists",
                          children: (
                            <div>screen
                            </div>
                          ),
                          className: "is-half",
                          icon: FaListAlt
                        },
                        {
                          name: "Alter a Collection",
                          children: (
                            <div>screen
                            </div>
                          ),
                          className: "is-one-quarter",
                          icon: FaPenSquare
                        }
                      ]}
                    />  
        </BulmaHero>
        <BulmaHero
          className="is-light"
          title="All driven by this little definition"
          iconConfig={FaUsersCog}
        >
          <HighlightedCode className="code-container" source={relationshipCode} />
        </BulmaHero>
      </PageContainer>
    )
  }
}

export default UiPage
