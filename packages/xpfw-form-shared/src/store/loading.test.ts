import { matchStoreState } from "resub-persist"
import { LoadingStore } from "./loading"

const LoadingStor = new LoadingStore()
const path = "lp"

test("Cover Form Store", () => {
  matchStoreState(LoadingStor, "Initial State")
  expect(LoadingStor.getLoading(path)).toBeFalsy()
  LoadingStor.setLoading(path, true)
  expect(LoadingStor.getLoading(path)).toBeTruthy()
  LoadingStor.setLoading(path + path, true)
  matchStoreState(LoadingStor, "two things loading")
  LoadingStor.setLoading(path, "true") // anything that isn't === true results in false / deletion
  matchStoreState(LoadingStor, "one thing loading")
  expect(LoadingStor.isSomethingLoading()).toBeTruthy()
  LoadingStor.setLoading(path + path, false)
  LoadingStor.setLoading(path, "nothing loading anymore")
})
