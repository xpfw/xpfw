import iterateEachInFind from "./iterateEachInFind"

it("Expect iterateEachInFind behaves as expected", async () => {
  const findMethod = (c: string, q: any) => {
    if (q.$skip === 0) {
      return Promise.resolve({total: 10, data: [{a: "b"}, {q: "b"}, {h: "b"}, {e: "b"}, {a: "c"}]})
    }
    return Promise.resolve({total: 15, data: [{jh: "we"}, {ju: "3"}, {k: "4"}, {l: "ö"}, {r: "e"}]})
  }
  let iteratedItems: any[] = []
  let i = 0
  await iterateEachInFind("bla", {qu: "la"}, findMethod, (obj: any) => {
    iteratedItems.push({sort: i, item: obj})
    i++
    return Promise.resolve()
  }, {pageSize: 5})
  expect(iteratedItems).toMatchSnapshot("result of iterate")
  iteratedItems = []
  await iterateEachInFind("bla", undefined, findMethod, (obj: any) => {
    iteratedItems.push({sort: i, item: obj})
    i++
    return Promise.resolve()
  }, {pageSize: 5})
  expect(iteratedItems).toMatchSnapshot("result of no query iteration")
  iteratedItems = []
  await iterateEachInFind("bla", undefined, () => Promise.resolve(null), (obj: any) => {
    iteratedItems.push({sort: i, item: obj})
    i++
    return Promise.resolve()
  }, {pageSize: 5})
  expect(iteratedItems).toMatchSnapshot("result of no faulty find iteration")
})
