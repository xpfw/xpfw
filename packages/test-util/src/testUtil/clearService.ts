
const clearService = async (service: any) => {
  try {
    await service.remove(null, {})
  } catch (e) {
    //
  }
}

export default clearService
