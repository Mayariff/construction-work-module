export type RowType = {
  equipmentCosts: number
  estimatedProfit: number
  id: number
  machineOperatorSalary: number
  mainCosts: number
  materials: number
  mimExploitation: number
  overheads: number
  rowName: string
  salary: number
  supportCosts: number
  total: number
  child?: childRowType
  parentId?: number | null
}
export type childRowType = null | null[] | RowType[]
export type Normalized<T extends { id: number }> = {
  ids: number[]
  entities: { [T.id]: T }
}
export type ErrorType = {
  status: number
  data: {
    timestamp: number
    error: string
    path: string
    status: number
  }
}

export type updateResType = {
  changed: RowType[]
  current: RowType
}

export type createResType = {
  id: number
  rowName: string
}

