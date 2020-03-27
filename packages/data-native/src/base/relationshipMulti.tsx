import { useRelationshipWithProps, IRelationshipHookProps} from "@xpfw/data"
import { get } from "lodash"
import * as React from "react"
import { View } from "react-native"
import { Button } from "react-native-elements"
import NativeFieldContainer from "./field"
import NativeRelationshipItem from "./relationshipItem"
import NativeRelationshipSearch from "./relationshipSearch"
import { observer } from "mobx-react"

const WebRelationshipMulti: React.FunctionComponent<IRelationshipHookProps & any> = observer((props) => {
  const relationHelper = useRelationshipWithProps(props)
  let content
  const gotVal = Array.isArray(relationHelper.value) && relationHelper.value.length > 0
  if (!gotVal || relationHelper.displayMode === 1) {
    content = (
        <NativeRelationshipSearch
          {...relationHelper}
          {...props}
        />
    )
  } else {
    const name = "loading"
    const relationItems = []
    for (const child of relationHelper.relatedObject) {
      relationItems.push(
        <NativeRelationshipItem
          schema={props.schema}
          item={child}
          addId={relationHelper.addId}
          removeId={relationHelper.removeId}
          isAdd={false}
        />)
    }
    content = (
      <View>
        <Button
          title="Search"
          {...props.buttonProps}
          onPress={relationHelper.showDisplay}
          icon={{name: "search"}}
        />
        {relationItems}
      </View>
    )
  }
  return (
    <NativeFieldContainer>
      {content}
    </NativeFieldContainer>
  )
})

export default WebRelationshipMulti
