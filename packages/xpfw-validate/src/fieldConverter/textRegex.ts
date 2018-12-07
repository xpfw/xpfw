import { FieldConverter } from "../typeDef"

const convertTextToMongoRegex: FieldConverter = (value) => {
    return {
        $regex: `(.*?)${value}(.*?)`,
        $options: "isg"
    }
}

export default convertTextToMongoRegex
