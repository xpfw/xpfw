
import { ComponentRegistry } from "@xpfw/form-shared"
import { tests } from "@xpfw/form-tests"
import { FieldType } from "@xpfw/validate"
import * as MockDate from "mockdate"
import LocationField, {
  handleLatLng, loadResources, valToLatLng
} from  "./location"
MockDate.set(new Date(2011, 4, 5, 16, 20, 42, 1337))

ComponentRegistry.registerComponent(FieldType.Location, LocationField)

test("Text Field Test", tests.location)

test("location helpers", () => {
  loadResources()
  expect(valToLatLng()).toMatchSnapshot("default return")
  expect(valToLatLng([2, 1])).toEqual([1, 2])
  const thisRef: any = {
    props: {
      value: "unset",
      setValue: (v: any) => {
        thisRef.props.value = v
      }
    }
  }
  const handler = handleLatLng(thisRef)
  expect(thisRef.props.value).toMatchSnapshot("not yet changed")
  handler({latlng: {lat: 53, lng: 22}})
  expect(thisRef.props.value).toMatchSnapshot("after change")
})
