const dataOptions = {
  /**
   * Feathers user service name
   */
  userCollection: "users",
  /**
   * The path for ids of database objects
   */
  idPath: "_id",
  /**
   * Sends MongoDB patch data so not the whole document gets transferred
   */
  onlyPatchDiffs: false
}
export default dataOptions
