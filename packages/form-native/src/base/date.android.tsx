
import { IFieldProps, useFieldWithValidation, memo, FormStore, getMapTo, getLabelFromProps } from "@xpfw/form"
import { get, isDate } from "lodash"
import * as React from "react"
import { DatePickerAndroid, TimePickerAndroid, TouchableHighlight, View } from "react-native"
import NativeFieldContainer from "./field"
import * as momentT from "moment"
import { Input } from "react-native-elements"
import { observer } from "mobx-react"
import { action } from "mobx"

const moment: any = momentT

const getOriginalFormatFromType = (dateType: string) => {
  let momentParseFrom = ""
  if (dateType === "date") {
    momentParseFrom = get(moment, "HTML5_FMT.DATE")
  } else if (dateType === "time") {
    momentParseFrom = get(moment, "HTML5_FMT.TIME")
  } else  {
    momentParseFrom = get(moment, "HTML5_FMT.DATETIME_LOCAL")
  }
  return momentParseFrom
}

const processTime = (mapTo: string, prefix: any) => {
  return memo(() => action(async () => {
    let value = FormStore.getValue(mapTo, prefix)
    const date = !isDate(value) ? new Date() : moment(value).toDate()
    const r: any = await TimePickerAndroid.open({
      hour: date.getHours(), minute: date.getMinutes()
    })
    const { action, hour, minute } = r
    if (action !== TimePickerAndroid.dismissedAction) {
      date.setHours(hour)
      date.setMinutes(minute)
      FormStore.setValue(mapTo, date, prefix)
    }
  }), ["processTime", mapTo, prefix])
}

const processDate = (mapTo: string, prefix: any) => {
  return memo(() => action(async () => {
    let value = FormStore.getValue(mapTo, prefix)
    const r: any = await DatePickerAndroid.open({date: moment(value).toDate()})
    const {action, year, month, day } = r
    if (action !== DatePickerAndroid.dismissedAction) {
      const date = !isDate(value) ? new Date() : moment(value).toDate()
      date.setFullYear(year)
      date.setMonth(month)
      date.setDate(day)
      FormStore.setValue(mapTo, date, prefix)
    }
  }), ["processDate", mapTo, prefix])
}

const AndroidDateField = observer((props: IFieldProps) => {
  const mapTo = getMapTo(props.schema, props.mapTo)
  const fieldProps = useFieldWithValidation(props.schema, props.mapTo, props.prefix)
  const dateType = get(props, "schema.format", "date")
  const value = fieldProps.value
  let inputFunc = processDate(mapTo, props.prefix)
  if (dateType === "datetime-local") {
    return (
      <NativeFieldContainer {...props}>
        <View style={{flexDirection: "row", display: "flex", flex: 1}}>
        <TouchableHighlight style={{flex: 1}} underlayColor="rgba(0, 0, 0, 0)" onPress={processDate(mapTo, props.prefix)}>
          <Input
            editable={false}
            value={moment(value).format(getOriginalFormatFromType("date"))}
          />
        </TouchableHighlight>
        <TouchableHighlight  style={{ flex: 1}} underlayColor="rgba(0, 0, 0, 0)" onPress={processTime(mapTo, props.prefix)}>
          <Input
            editable={false}
            value={moment(value).format(getOriginalFormatFromType("time"))}
          />
        </TouchableHighlight>
        </View>
      </NativeFieldContainer >
    )
  } else if (dateType === 4) {
    inputFunc = processTime(mapTo, props.prefix)
  }
  return (
    <NativeFieldContainer {...props}>
      <TouchableHighlight underlayColor="rgba(0, 0, 0, 0)" onPress={inputFunc}>
        <Input
          {...props}
          label={getLabelFromProps(props)}
          editable={false}
          value={moment(value).format(getOriginalFormatFromType(dateType))}
        />
      </TouchableHighlight>
    </NativeFieldContainer >
  )
})

export default AndroidDateField
