
import { ComponentRegistry } from "@xpfw/form"
import { locationTest } from "@xpfw/form-tests"
import MockDate from "mockdate"
import LocationField, {
  handleLatLng, loadResources, valToLatLng
} from  "./location"
MockDate.set(new Date(2011, 4, 5, 16, 20, 42, 1337))

ComponentRegistry.registerComponent("array", LocationField)
test("TBD!", () => {})
// test("Text Field Test", locationTest)

// test("location helpers", () => {
//   loadResources()
//   expect(valToLatLng()).toMatchSnapshot("default return")
//   expect(valToLatLng([2, 1])).toEqual([1, 2])
//   const thisRef: any = {
//     props: {
//       value: "unset",
//       setValue: (v: any) => {
//         thisRef.props.value = v
//       }
//     }
//   }
//   const handler = handleLatLng(thisRef)
//   expect(thisRef.props.value).toMatchSnapshot("not yet changed")
//   handler({latlng: {lat: 53, lng: 22}})
//   expect(thisRef.props.value).toMatchSnapshot("after change")
// })
