import { ExtendedJSONSchema } from "@xpfw/form"
import * as momentA from "moment"
const moment: any = momentA

const TimeBeginField: ExtendedJSONSchema = {
  title: "$gte",
  type: "string",
  format: "date",
  default: moment().startOf("month").toDate()
}

const TimeEndField: ExtendedJSONSchema = {
  title: "$lte",
  type: "string",
  format: "date",
  default: moment().endOf("month").toDate()
}

export {
  TimeBeginField,
  TimeEndField
}
