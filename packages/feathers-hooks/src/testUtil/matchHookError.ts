// TODO: if another use case like this turns up rewrite this so we recreate an
// object with get instead of matchin full err or regular result should support both :)
const matchHookError = async (updatePromise: Promise<any>, msg: string) => {
  try {
    await updatePromise
  } catch (e) {
    expect(e.errors).toMatchSnapshot(msg)
  }
}

export default matchHookError
