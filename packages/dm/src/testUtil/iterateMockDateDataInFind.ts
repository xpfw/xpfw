import * as moment from "moment"

const iterateMockDataInFind = (c: string, q: any) => {
  const data1: any = []
  const data2: any = []

  for (let i = 0; i < 60; i++) {
    if (i > 30) {
      data1.push({
        myNum: i * 4 + 2,
        createdAt: moment.utc().add(i - 30, "d").toDate(),
        compDate: moment.utc().subtract(i, "d").toDate()
      })
    } else {
      data2.push({
        myNum: i * 4 + 2,
        createdAt: moment.utc().subtract(i, "d").toDate(),
        compDate: moment.utc().add(i - 30, "d").toDate()
      })
    }
  }
  if (q.$skip === 0) {
    return Promise.resolve({total: 10, data: data1})
  }
  return Promise.resolve({total: 10, data: data2})
}

export default iterateMockDataInFind
