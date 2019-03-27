import { StatType } from "@xpfw/dm"

const simpleSum = {
  type: StatType.sum,
  id: "simpleSum"
}
const pathSum = {
  type: StatType.sum,
  options: {itemPath: "myNum"},
  id: "pathSum"
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

export {
  simpleSum, pathSum,
  timeStepSum, timeStepSumPath, timeStepTimeDistance,
  timeStepForm
}
