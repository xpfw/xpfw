export interface IStatConfig {
  type: string
  /**
   * used for recognition in react elements
   */
  id: string
  options?: any
}

export type IFindMethod = any

/**
 * Based StatCalculator Type
 * O is the type of the iterated Object
 * R is the type of the result of the calculator
 */
export type TypedStatCalculator<O, R> =
  (object: O) => Promise<R>

/**
 * Common Options for calculators
 */
export interface ICommonOptions {
  itemPath?: string
}

/**
 * Common Options for comparers
 * Will use itemPath and compareWithPath
 */
export interface ICompareOptions extends ICommonOptions {
  /**
   * path for compare with
   */
  compareWithPath?: string
}

/**
 * Common Options for timestep functions
 */
export interface ITimestepOptions extends ICommonOptions {
  /**
   * path for date to check
   */
  datePath?: string
  subConfig?: any
  subType?: string
  timeSteps: any
}

export interface IChartConfig {
  id: string
  calcType: string
  displayType: string
  options?: any
}

export type NumberCalculator = (config?: ICommonOptions,
                                findMethod?: (c: string, q: any) => Promise<any>) => TypedStatCalculator<any, number>

export type CompareNumberCalculator = (config?: ICompareOptions,
                                       findMethod?: (c: string, q: any) => Promise<any>)
                                       => TypedStatCalculator<any, number>

export type TimeStepCalculator = (config?: ITimestepOptions,
                                  findMethod?: (c: string, q: any) => Promise<any>)
                                  => TypedStatCalculator<any, number>

export type DefaultStatCalculator = TypedStatCalculator<any, void>
