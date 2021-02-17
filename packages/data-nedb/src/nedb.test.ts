import nedb from "nedb"
import NedbClient from "./nedb"
NedbClient.instanceCreator = nedb
const dataToCreate = [
  {bla: "blubb", hey: 3, _id: "#1"},
  {schwap: "didap", blu: 5, _id: "#2"},
  {yo: "420", dabs: 1, _id: "#3"}
]

const col = "tempDb"

const db = new nedb({
  filename: col,
  autoload: true
})

describe("nedb adapter", () => {
  it("db cleaned", (done) => {
    db.remove({}, {multi: true}, () => {
      done()
    })
  })
  it("behaves as expected", async () => {
    expect(await NedbClient.find(col, {})).toMatchSnapshot("empty search result because nothing yet created")
    const createdData = []
    for (const index in dataToCreate) {
      expect(await NedbClient.get(col, dataToCreate[index]._id))
      .toMatchSnapshot("before creation get operation returns nothing " + index)
      expect(await NedbClient.create(col, dataToCreate[index])).toMatchSnapshot("creation result of " + index)
      expect(await NedbClient.get(col, dataToCreate[index]._id))
      .toMatchSnapshot("after creation get operation works correctly " + index)
    }
    expect(await NedbClient.find(col, {})).toMatchSnapshot("find should now have entries")
    expect(await NedbClient.find(col, {dabs: 1})).toMatchSnapshot("find filter works")
    expect(await NedbClient.remove(col, "#3")).toMatchSnapshot("result of removal")
    expect(await NedbClient.find(col, {dabs: 1})).toMatchSnapshot("after removal single element cant be found")

    expect(await NedbClient.find(col, {fun: 6})).toMatchSnapshot("before update element can't be found")
    expect(await NedbClient.patch(col, dataToCreate[0]._id, {$set: {fun: 6}})).toMatchSnapshot("result of update")
    expect(await NedbClient.find(col, {fun: 6})).toMatchSnapshot("after update element can be found by new property")

    expect(await NedbClient.find(col, {})).toMatchSnapshot("after removal and update other entries pertain")
  })
  it("db cleaned twice", (done) => {
    db.remove({}, {multi: true}, () => {
      done()
    })
  })
})
