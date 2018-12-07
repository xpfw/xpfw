const RequiredType = {
  Always: 2,
  AllNotSet: 3,
  SetToVal: 4
}

const ErrorType = {
  invalidType: 3,
  required: 4,
  tooLow: 5,
  tooHigh: 420,
  notEqual: 6,
  emptyUpdate: 7
}

const FieldType = {
  Text: 2,
  Number: 3,
  Boolean: 4,
  Date: 5,
  Select: 6,
  Password: 7,
  Array: 10,
  Object: 12,
  RelationshipSingle: 13,
  RelationshipMulti: 14,
  Slider: 15,
  Location: 16
}

const Permission = {
    Guest: "guest",
    User: "user",
    Owner: "owner",
    Admin: "admin",
    Server: "server"
}

const Method = {
  Create: "create",
  Update: "update",
  Patch: "patch",
  Find: "find",
  Remove: "remove",
  Get: "get"
}

const StatType = {
  sum: "sum",
  mean: "mean",
  timeStep: "timeStep",
  sumTimeDistance: "sumTimeDistance",
  sumPrevTimeDistance: "sumPrevTimeDistance",
  avgTimeDistance: "avgTimeDistance",
  avgPrevTimeDistance: "avgPrevTimeDistance"
}

const DateType = {
  dateTime: 2,
  date: 3,
  time: 4
}

const options = {
  userCollection: "users",
  userIdPath: "_id"
}

export {
  StatType, RequiredType, ErrorType, FieldType, Permission, Method, DateType, options
}
export default {
  StatType, RequiredType, ErrorType, FieldType, Permission, Method, DateType, options
}
