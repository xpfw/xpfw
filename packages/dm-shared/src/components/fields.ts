import { FieldType, IField } from "@xpfw/validate"
import * as momentA from "moment"
const moment: any = momentA

const TimeBeginField: IField = {
  mapTo: "$gte",
  type: FieldType.Date,
  validate: {
    defaultValue: moment().startOf("month").toDate()
  }
}

const TimeEndField: IField = {
  mapTo: "$lte",
  type: FieldType.Date,
  validate: {
    defaultValue: moment().endOf("month").toDate()
  }
}

export {
  TimeBeginField,
  TimeEndField
}
