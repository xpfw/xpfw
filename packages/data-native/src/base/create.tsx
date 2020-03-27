import * as React from "react"
import { dataOptions,  useCreateWithProps, ICreateHookProps } from "@xpfw/data"
import { getMapToFromProps, iterateSubFields, prependPrefix, SharedField } from "@xpfw/form"
import { get } from "lodash"
import { observer } from "mobx-react"
import { View } from "react-native"
import { Button, Text, Card } from "react-native-elements"

const NativeCreate: React.FunctionComponent<ICreateHookProps> = observer((props) => {
  const createProps = useCreateWithProps(props)
  const fields: any[] = []
  iterateSubFields(props.schema, (key, schema) => {
    fields.push(<SharedField key={key} schema={schema} prefix={prependPrefix(getMapToFromProps(props), props.prefix)} />)
  })
  const gotErr = createProps.error != null
  const result = createProps.state
  let msg: any
  if (gotErr) {
    msg = (
      <Card
        containerStyle={{backgroundColor: "green", margin: 3}}
      >
        <Text style={{color: "white", textAlign: "center"}}>
          Error please recheck your inputs or connection {JSON.stringify(createProps.error)}
        </Text>
      </Card>
    )
  }
  if (result) {
    msg = (
      <Card
        containerStyle={{backgroundColor: "green", margin: 3}}
      >
        <Text style={{color: "white", textAlign: "center"}}>
          Successfully created {get(result, dataOptions.idPath, "")}
        </Text>
      </Card>
    )
  }
  return (
    <View>
      {fields}
      <View style={{marginTop: 20, marginLeft: 5, marginRight: 5}}>
        <Button onPress={createProps.submitCreate} title="Create" />
      </View>
      {msg}
    </View>
  )
})

export default NativeCreate