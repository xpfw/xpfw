import { FieldConverter } from "../typeDef"

const convertTextToMongoRegex: FieldConverter = (value) => {
  if (value == null || value.length === 0) {
    return null
  }
    return {
        $regex: `(.*?)${value}(.*?)`,
        $options: "isg"
    }
}

export default convertTextToMongoRegex
