// noinspection TypeScriptUnresolvedVariable

import { RowType } from "./types"
import { copyState, findObj } from "./healpers"

// редьюсер для useReducer  (для локальных изменений без участия сервера)
// не стала использовать RTK, тк данные изменяются синхронно и только в одной компоненте Table

export const tableReducer = (
  state: RowType[],
  action: ActionStateType,
): RowType[] => {
  const newState = copyState(state)
  switch (action.type) {
    case ActionType.GET:
      return JSON.parse(JSON.stringify(state)) //использую такое копированае, тк оно быстрее и проще, чем рекурсивная функция + в объектах нет функций
    case ActionType.ADD: {
      findObj(
        newState,
        action.payload,
        (curEl: RowType, payload: { id: number; newRow: RowType }) => {
          if (curEl.child && !(curEl.child[0] === null)) {
            curEl.child = [...curEl.child, payload.newRow]
          } else {
            curEl.child = [payload.newRow]
          }
        },
      )
      return newState
    }
    case ActionType.UPDATE: {
      findObj(
        newState,
        action.payload,
        (
          curEl: RowType,
          payload: { id: number; updatingRow: RowType },
          rows: RowType[],
        ) => {
          const index = rows.indexOf(curEl)
          if (index > -1) {
            rows.splice(index, 1, payload.updatingRow)
          }
        },
      )
      return newState
    }
    case ActionType.DEL: {
      findObj(
        newState,
        action.payload,
        (curEl: RowType, payload: { id: number }, rows: RowType[] | null[]) => {
          const index = rows.indexOf(curEl)
          if (index > -1) {
            rows.splice(index, 1)
            if (rows && rows.length === 0) {
              rows.push(null as (RowType & null) | undefined)
            }
          }
        },
      )

      return newState
    }

    default:
      return JSON.parse(JSON.stringify(state))
  }
}

enum ActionType {
  GET = "tableReducer/getRows",
  ADD = "tableReducer/AddRow",
  UPDATE = "tableReducer/updateRow",
  DEL = "tableReducer/deleteRow",
}

//action creators
export const getRowsAC = () => ({ type: ActionType.GET })
export const addRowAC = (payload: { id: number | null; newRow: RowType }) => ({
  type: ActionType.ADD,
  payload,
})
export const updateRowAC = (payload: { id: number; updatingRow: RowType }) => ({
  type: ActionType.UPDATE,
  payload,
})
export const delRowAC = (payload: { id: number }) => ({
  type: ActionType.DEL,
  payload,
})

export type ActionStateType =
  | ReturnType<typeof getRowsAC>
  | ReturnType<typeof addRowAC>
  | ReturnType<typeof updateRowAC>
  | ReturnType<typeof delRowAC>
