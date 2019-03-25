import * as moment from "moment"
const data1: any = []
const data2: any = []

for (let i = 0; i < 60; i++) {
  if (i > 30) {
    data1.push({
      myNum: i * 4 + 2,
      createdAt: moment().add(i - 30, "d").toDate(),
      compDate: moment().subtract(i, "d").toDate()
    })
  } else {
    data2.push({
      myNum: i * 4 + 2,
      createdAt: moment().subtract(i, "d").toDate(),
      compDate: moment().add(i - 30, "d").toDate()
    })
  }
}

const iterateMockDataInFind = (c: string, q: any) => {
  if (q.$skip === 0) {
    return Promise.resolve({total: 10, data: data1})
  }
  return Promise.resolve({total: 10, data: data2})
}

export default iterateMockDataInFind
