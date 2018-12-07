import { globals, TestDefs } from "@xpfw/validate"
const FormWithPermissionsOnFields = TestDefs.FormWithPermissionsOnFields
import clearService from "../testUtil/clearService"
import getRandomApp from "../testUtil/getRandomApp"
import stripId from "../testUtil/stripId"
import validateCreate from "./validateCreate"
import validateFind from "./validateFind"

test("verify func", async () => {
  const { cleanUpDb, app, service } = await getRandomApp("validateFind", true)
  await clearService(service)

  const serviceParams = {user: {_id: globals.Permission.Server}}

  service.hooks({before: {
    create: [validateCreate(FormWithPermissionsOnFields)],
    find: [validateFind(FormWithPermissionsOnFields)]
  }})

  for (let i = 0; i < 40; i++) {
    stripId(await service.create({
      permbool: i % 2 === 0, guestName: `name#${i}`, filtered: "out", of: 32, the: ["o", "b", "j", "ct"]
    }, serviceParams))
  }

  expect(stripId(await service.find({}))).toMatchSnapshot("result of basic find")

  expect(stripId(await service.find({
    query: {permbool: true, $sort: {guestName: 1}},
    user: {_id: globals.Permission.Server}
  })))
  .toMatchSnapshot("result of find permbool: true")
  expect(stripId(await service.find({
    query: {permbool: false, $sort: {guestName: 1}},
    user: {_id: globals.Permission.Server}
  }))).
  toMatchSnapshot("result of find permbool: false")
  expect(stripId(await service.find({
    query: {permbool: {$eq: false}, $sort: {guestName: 1}},
    user: {_id: globals.Permission.Server}
  })))
  .toMatchSnapshot("result of find permbool: false via eq")
  expect(stripId(await service.find({
    query: {permbool: {$ne: false}, $sort: {guestName: 1}},
    user: {_id: globals.Permission.Server}
  })))
  .toMatchSnapshot("result of find permbool: false via neq")
  expect(stripId(await service.find({
    query: {permbool: {$eq: true}, $sort: {guestName: 1}},
    user: {_id: globals.Permission.Server}
  })))
  .toMatchSnapshot("result of find permbool: true via eq")
  expect(stripId(await service.find({
    query: {permbool: {$ne: true}, $sort: {guestName: 1}},
    user: {_id: globals.Permission.Server}
  })))
  .toMatchSnapshot("result of find permbool: true via neq")
  expect(stripId(await service.find({
    query: {
      permbool: {$in: [true]}, $sort: {guestName: 1}
    },
    user: {_id: globals.Permission.Server}
  })))
  .toMatchSnapshot("result of find permbool: true via $in")
  expect(stripId(await service.find({
    query: {
      $or: [{permbool: true}, {guestName: "name#35"}], $sort: {guestName: 1}
    },
    user: {_id: globals.Permission.Server}
  })))
  .toMatchSnapshot("result of find with $or")
  expect(stripId(await service.find({
    query: {
      $and: [{permbool: false}, {guestName: "name#35"}], $sort: {guestName: 1}
    },
    user: {_id: globals.Permission.Server}
  })))
  .toMatchSnapshot("result of find with $and")
  await cleanUpDb()
})
