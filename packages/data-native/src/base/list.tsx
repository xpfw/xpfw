import { IListHookProps, useListWithProps, dataOptions } from "@xpfw/data"
import { iterateSubFields } from "@xpfw/form"
import { each, get } from "lodash"
import { observer } from "mobx-react-lite"
import * as React from "react"
import { View } from "react-native"
import { Text, Button, ListItem } from "react-native-elements"

const List: React.FunctionComponent<IListHookProps> = observer((props) => {
  const listProps = useListWithProps(props)
  const fields: any[] = []
  const loading = listProps.loading
  if (listProps.list != null && Array.isArray(listProps.list.data)) {
    for (const child of listProps.list.data) {
      const fieldContent: any[] = []
      iterateSubFields(props.schema, (key, subSchema) => {
        fieldContent.push((
          <Text key={key}>
            {key}: {JSON.stringify(get(child, String(subSchema.title)))}
          </Text>
        ))
      })
      fields.push(
        <ListItem title={<>{fieldContent}</>} bottomDivider topDivider key={get(child, dataOptions.idPath)} />
      )
    }
  }
  if (loading) {
    fields.push(
      <Text>
        Loading
      </Text>
    )
  }
  const pageBtns = (
    <View style={{flexDirection: "row", flex: 1, alignItems: "center"}}>
      <Button title="Prev" onPress={listProps.prevPage} />
      <Text style={{flex: 1, textAlign: "center"}}>{listProps.currentPage + 1} / {listProps.maxPage}</Text>
      <Button title="Next" onPress={listProps.nextPage} />
    </View>
  )
  return (
    <View>
      {pageBtns}
      {fields}
    </View>
  )
})

export default List
