const optionsPrefix = "options."

/**
 * This object contains predefined keys for options
 * to set an options imply use `FormStore.setKey(options["myOption"])`
 */
const options = {
  /**
   * if set to true it wil auto select an item in relationship search if it is the only one found
   */
  relationshipAutoSelect: `${optionsPrefix}relationshipAutoSelect`
}

export default options
