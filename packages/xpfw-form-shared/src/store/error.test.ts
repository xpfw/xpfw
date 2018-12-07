import { matchStoreState } from "resub-persist"
import { FormErrorStore as FormErrorStoreCreator } from "./error"

const FormErrorStore = new FormErrorStoreCreator()
const errPath = "errpath"
const myErr = {my: "error"}

test("Cover Form Store", () => {
  matchStoreState(FormErrorStore, "Initial State")
  FormErrorStore.setError(errPath, myErr)
  matchStoreState(FormErrorStore, "Set Error")
  expect(FormErrorStore.getError(errPath)).toBe(myErr)
})
