import { StatType } from "@xpfw/validate"
import avgPrevTimeDistance from "./util/avgPrevTimeDistance"
import avgTimeDistance from "./util/avgTimeDistance"
import mean from "./util/mean"
import sum from "./util/sum"
import sumPrevTimeDistance from "./util/sumPrevTimeDistance"
import sumTimeDistance from "./util/sumTimeDistance"
import timeStep from "./util/timeStep"

const statTypes = {
  [StatType.sum]: sum,
  [StatType.mean]: mean,
  [StatType.timeStep]: timeStep,
  [StatType.sumTimeDistance]: sumTimeDistance,
  [StatType.sumPrevTimeDistance]: sumPrevTimeDistance,
  [StatType.avgTimeDistance]: avgTimeDistance,
  [StatType.avgPrevTimeDistance]: avgPrevTimeDistance
}

export default statTypes
