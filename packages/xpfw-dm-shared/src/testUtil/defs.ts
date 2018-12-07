import { IForm, StatType } from "@xpfw/validate"

const simpleSum = {
  type: StatType.sum,
  id: "simpleSum"
}
const pathSum = {
  type: StatType.sum,
  options: {itemPath: "myNum"},
  id: "pathSum"
}

const sumForm: IForm = {
  collection: "sum", model: "sum",
  sections: [],
  stats: [simpleSum, pathSum]
}

const timeStepSum = {
  type: StatType.timeStep,
  id: "timeStepSum",
  options: {
    subType: StatType.sum
  }
}

const timeStepSumPath = {
  type: StatType.timeStep,
  id: "timeStepSumPath",
  options: {
    subType: StatType.sum,
    subConfig: {itemPath: "myNum"}
  }
}

const timeStepTimeDistance = {
  type: StatType.timeStep,
  id: "timeStepTimeDistance",
  options: {
    subType: StatType.avgPrevTimeDistance,
    subConfig: {itemPath: "createdAt"
  }}
}

const timeStepForm: IForm = {
  collection: "timeStep", model: "timeStep",
  sections: [],
  stats: [timeStepSum, timeStepSumPath, timeStepTimeDistance]
}

export {
  simpleSum, pathSum, sumForm,
  timeStepSum, timeStepSumPath, timeStepTimeDistance,
  timeStepForm
}
