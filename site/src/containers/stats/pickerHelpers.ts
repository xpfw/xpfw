
import { TimeBeginField, TimeEndField } from "@xpfw/dm-shared"
import { FormStore } from "@xpfw/form-shared"

const moment: any = require("moment")

const dates = {
  thisMonth: 1,
  thisYear: 2,
  lastMonth: 3,
  lastYear: 4
}

const setToDate = (type: number) => {
  let begin = new Date()
  let end = new Date()
  if (type === dates.thisMonth) {
    begin = moment().startOf("month").toDate()
    end = moment().toDate()
  } else if (type === dates.lastMonth) {
    begin = moment().subtract(1, "month").startOf("month").toDate()
    end = moment().subtract(1, "month").endOf("month").toDate()
  } else if (type === dates.lastYear) {
    begin = moment().subtract(1, "year").startOf("year").toDate()
    end = moment().subtract(1, "year").endOf("year").toDate()
  } else if (type === dates.thisYear) {
    begin = moment().startOf("year").toDate()
    end = moment().endOf("year").toDate()
  }
  FormStore.setValue(TimeBeginField.mapTo, begin)
  FormStore.setValue(TimeEndField.mapTo, end)
}

export {
  dates, setToDate
}
