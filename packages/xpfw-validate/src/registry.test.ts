import { ValidationRegistry } from "./registry"
import TestDefs from "./testUtil/defs"

const isFuncS = "-1"

test("Registry Functionality", () => {
  const instance: any = new ValidationRegistry()
  const toTest: any = [
    ["registerField", "findField", "mapTo", [
      {mapTo: "myV"}, {mapTo: "MyC"}
    ]],
    ["registerForm", "findForm", "model", [
      {model: "formS"}, {model: "notherForm"}
    ]],
    ["registerValidator", "findValidator", isFuncS, [
      {n: `LALA`, f: () => "c"}, {n: `LULU`, f: () => "a"}
    ]]
  ]
  for (const valHelp of toTest) {
    for (const valToTest of valHelp[3]) {
      if (valHelp[2] === isFuncS) {
        expect(instance[valHelp[1]](valToTest.n, valToTest.f)).toBe(undefined)
        instance[valHelp[0]](valToTest.n, valToTest.f)
        expect(instance[valHelp[1]](valToTest.n, valToTest.f)).toBe(valToTest.f)
      } else {
        expect(instance[valHelp[1]](valToTest[valHelp[2]])).toBe(undefined)
        instance[valHelp[0]](valToTest)
        expect(instance[valHelp[1]](valToTest[valHelp[2]])).toBe(valToTest)
      }
    }
  }
})

test("registerform", () => {
  const instance: any = new ValidationRegistry()
  expect(instance).toMatchSnapshot("before anything")
  TestDefs.FormNumberAndRequiredText.collection = "myCOLL"
  instance.registerForm(TestDefs.FormNumberAndRequiredText)
  expect(instance).toMatchSnapshot("after registering form")
})
