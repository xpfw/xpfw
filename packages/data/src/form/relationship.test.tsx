import { relationshipTest, toJS } from "@xpfw/data-tests"
import { ComponentRegistry } from "@xpfw/form"
import { RelationshipMultiField, RelationshipSingleField } from "@xpfw/form-tests"
import "isomorphic-fetch"
import * as React from "react"
import { IRelationshipHookProps, useRelationshipWithProps } from "./relationship"

const MockedRelationship: React.FunctionComponent<IRelationshipHookProps> = (props) => {
  const relation = useRelationshipWithProps(props)
  return (
    <div>{JSON.stringify(toJS(relation), undefined, 2)}</div>
  )
}

ComponentRegistry.registerComponent(String(RelationshipSingleField.type), MockedRelationship,
RelationshipSingleField.theme)
ComponentRegistry.registerComponent(String(RelationshipMultiField.type), MockedRelationship,
RelationshipMultiField.theme)

relationshipTest()
