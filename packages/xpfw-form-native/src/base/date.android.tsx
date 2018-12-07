
import { IFieldProps } from "@xpfw/form-shared"
import { globals } from "@xpfw/validate"
import { get, isDate } from "lodash"
import * as React from "react"
import { DatePickerAndroid, TimePickerAndroid, TouchableHighlight, View } from "react-native"
import NativeFieldContainer from "./field"
declare const require: any
import * as momentT from "moment"
import { FormInput } from "react-native-elements"
const moment: any = momentT
const getOriginalFormatFromType = (dateType: number) => {
  let momentParseFrom = ""
  if (dateType === 3) {
    momentParseFrom = get(moment, "HTML5_FMT.DATE")
  } else if (dateType === 4) {
    momentParseFrom = get(moment, "HTML5_FMT.TIME")
  } else  {
    momentParseFrom = get(moment, "HTML5_FMT.DATETIME_LOCAL")
  }
  return momentParseFrom
}

const processDate = (thisRef: any) => {
  return async () => {
    const {action, year, month, day } = await DatePickerAndroid.open({date: moment(thisRef.props.value).toDate()})
    if (action !== DatePickerAndroid.dismissedAction) {
      const date = !isDate(thisRef.props.value) ? new Date() : moment(thisRef.props.value).toDate()
      date.setFullYear(year)
      date.setMonth(month)
      date.setDate(day)
      thisRef.props.setValue(date)
    }
  }
}
const processTime = (thisRef: any) => {
  return async () => {
    const date = !isDate(thisRef.props.value) ? new Date() : moment(thisRef.props.value).toDate()
    const { action, hour, minute } = await TimePickerAndroid.open({
      hour: date.getHours(), minute: date.getMinutes()
    })
    if (action !== TimePickerAndroid.dismissedAction) {
      date.setHours(hour)
      date.setMinutes(minute)
      thisRef.props.setValue(date)
    }
  }
}

export default class AndroidDateField extends React.Component<IFieldProps, any> {
  private pickDate: any
  private pickTime: any
  public constructor(props: any) {
    super(props)
    this.pickDate = processDate(this)
    this.pickTime = processTime(this)
  }
  public render() {
    const dateType = get(this.props, "field.validate.type")
    const value = this.props.value
    let inputFunc = this.pickDate
    if (dateType === globals.DateType.dateTime) {
      return (
        <NativeFieldContainer {...this.props}>
          <View style={{flexDirection: "row", display: "flex", flex: 1}}>
          <TouchableHighlight style={{flex: 1}} underlayColor="rgba(0, 0, 0, 0)" onPress={this.pickDate}>

            <FormInput
              editable={false}
              value={moment(value).format(getOriginalFormatFromType(globals.DateType.date))}
            />
          </TouchableHighlight>
          <TouchableHighlight  style={{ flex: 1}} underlayColor="rgba(0, 0, 0, 0)" onPress={this.pickTime}>
            <FormInput
              editable={false}
              value={moment(value).format(getOriginalFormatFromType(globals.DateType.time))}
            />
          </TouchableHighlight>
          </View>
        </NativeFieldContainer >
      )
    } else if (dateType === 4) {
      inputFunc = this.pickTime
    }
    return (
      <NativeFieldContainer {...this.props}>
        <TouchableHighlight underlayColor="rgba(0, 0, 0, 0)" onPress={inputFunc}>
          <FormInput
            {...this.props}
            editable={false}
            value={moment(value).format(getOriginalFormatFromType(dateType))}
          />
        </TouchableHighlight>
      </NativeFieldContainer >
    )
    }
  }
