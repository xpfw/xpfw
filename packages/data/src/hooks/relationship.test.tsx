import { relationshipTest, toJS } from "@xpfw/data-tests"
import { ComponentRegistry, prependPrefix } from "@xpfw/form"
import { RelationshipMultiField, RelationshipSingleField } from "@xpfw/form-tests"
import "isomorphic-fetch"
import * as React from "react"
import useList from "./list"
import { IRelationshipHookProps, useRelationshipWithProps } from "./relationship"

const MockedRelationship: React.FunctionComponent<IRelationshipHookProps> = (props) => {
  const relation = toJS(useRelationshipWithProps(props))
  const list = toJS(useList(relation.searchForm, undefined, prependPrefix(props.prefix, "search")))
  return (
    <div>{JSON.stringify({
      ...relation, ...list
    }, undefined, 2)}</div>
  )
}

ComponentRegistry.registerComponent(String(RelationshipSingleField.type), MockedRelationship,
RelationshipSingleField.theme)
ComponentRegistry.registerComponent(String(RelationshipMultiField.type), MockedRelationship,
RelationshipMultiField.theme)

relationshipTest()
