import { RowType } from "./types";

// для редьюсера: каждый раз копируем объект с данными
export function copyState(state){
  return JSON.parse(JSON.stringify(state))
}

// рекурсивный обход для поиска нужного объекта + применение к нему нужного куйса из редьюсера
export function findObj<T extends { id: number } >(
  rows: RowType[],
  payload:T ,
  func,
) {
  if (rows.length < 1) return
  const curEl = rows.find((row) => row.id === payload.id)
  if (curEl) {
    func(curEl, payload, rows)
    return curEl
  }

  for (let row of rows) {
    if (!row.child || row.child[0] === null) continue
    findObj(row.child as RowType[], payload, func)
  }
}
