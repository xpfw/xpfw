import { BackendClient, ListStore } from "@xpfw/data";
import NedbClient from "@xpfw/data-nedb";
BackendClient.client = NedbClient

import * as React from 'react'
import { FaDatabase, FaListAlt, FaPenSquare, FaPlusCircle, FaUndo } from 'react-icons/fa';
import CardColumn from '../../components/cardColumn';
import BulmaHero from '../../components/hero';
import MiniCreate from "../../components/ui/create";
import ChangeableMiniEdit from '../../components/ui/edit';
import UiList, { resetData } from '../../components/ui/list';
import siteGlobals from '../../globals';
import { RecipeModel } from '../../globals';
const rc: any = RecipeModel.collection
class UiIntro extends React.Component<any, any> {
  public render() {
    return (
      <div>
        <BulmaHero
          className="is-light"
          title="Backend independent customizable CRUD-Frontend"
          iconConfig={FaDatabase}
        >
          <div className="has-text-centered pullUpMargin">
            This one is backed by&nbsp;
            <a target="_blank" className={siteGlobals.linkClass} href="/docs/stacks/nedb.html">
              @xpfw/ui-nedb
            </a>
          </div>
          <div style={{marginTop: "3.8rem"}}>
            <CardColumn
                  content={[
                    {
                      name: "Create",
                      children: (
                        <div>
                          Create Items that will appear in the list
                          <MiniCreate schema={RecipeModel} prefix="create" />
                        </div>
                      ),
                      className: "is-one-quarter",
                      icon: FaPlusCircle
                    },
                    {
                      name: "Read & Delete",
                      children: (
                        <div>
                          <div className="is-flex centerJustify smallMarginBottom">
                          Go through demo data and created items &nbsp;
                          <a className="button" onClick={async () => {
                            await resetData(RecipeModel)
                          }}>
                            <FaUndo />Reset Data
                          </a>
                          </div>
                          <UiList collection={rc} />
                        </div>
                      ),
                      className: "is-half",
                      icon: FaListAlt
                    },
                    {
                      name: "Edit",
                      children: (
                        <div>
                          Select an Item from the list to edit it here
                          <ChangeableMiniEdit form={RecipeModel} />
                        </div>
                      ),
                      className: "is-one-quarter",
                      icon: FaPenSquare
                    }
                  ]}
                />
              </div>
        </BulmaHero>
      </div>
    )
  }
}

export default UiIntro
