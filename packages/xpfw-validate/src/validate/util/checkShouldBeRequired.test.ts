import { RequiredType } from "../../globals"
import checkShouldBeRequirede from "./checkShouldBeRequired"

const checkShouldBeRequired: any = checkShouldBeRequirede

test(`Should be required test`, () => {

  const withNotSet = {
    type: RequiredType.AllNotSet,
    model: [`test`]
  }

  const ifSetToThisValue = 34
  const orIfSetToThisValue = 12
  const withIfSetToValue = {
    type: RequiredType.SetToVal,
    model: `mymdl`,
    values: [ifSetToThisValue, orIfSetToThisValue]
  }

  expect(checkShouldBeRequired()).toMatchSnapshot(`No args means not required`)

  expect(checkShouldBeRequired({validate: {required: {type: RequiredType.Always}}}))
  .toMatchSnapshot(`Required true shoud return true`)

  expect(checkShouldBeRequired({validate: {required: withNotSet}}))
  .toMatchSnapshot(`Required ifNotSet with empty object true`)

  expect(checkShouldBeRequired({validate: {required: withNotSet}}, {asdf: true}))
  .toMatchSnapshot(`Required ifNotSet with object but field not set true`)

  expect(checkShouldBeRequired({validate: {required: withNotSet}}, {test: false}))
  .toMatchSnapshot(`Required ifNotSet with object and field set false`)

  expect(checkShouldBeRequired({validate: {required: withIfSetToValue}}))
  .toMatchSnapshot(`Required ifSetToValue with empty object`)

  expect(checkShouldBeRequired({validate: {required: withIfSetToValue}}, {formData: {mymdl: 5643}}))
  .toMatchSnapshot(`Required ifSetToValue with field set to different value false`)

  expect(checkShouldBeRequired({validate: {required: withIfSetToValue}}, {formData: {mymdl: ifSetToThisValue}}))
  .toMatchSnapshot(`Required ifSetToValue with field set to correct value true`)

  expect(checkShouldBeRequired({validate: {required: withIfSetToValue}}, {formData: {mymdl: orIfSetToThisValue}}))
  .toMatchSnapshot(`Required ifSetToValue with field set to second correct value true`)

  expect(checkShouldBeRequired({validate: {required: withNotSet}}, {formData: {test: orIfSetToThisValue}}))
  .toMatchSnapshot(`Required ifSetToValue with field set to second correct value true`)

})
