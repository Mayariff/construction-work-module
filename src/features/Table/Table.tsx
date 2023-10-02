import { useReducer } from "react"
import { RowType } from "./types"
import { TableHeaderRow, TableRow } from "../../common"
import { addRowAC, delRowAC, tableReducer, updateRowAC } from "./tableReducer"
import { copyState } from "./healpers"
import { columnHeaderArr, data } from "./data"

const Table = () => {
  // что было бы с RTK Query
  // const { data, isSuccess, isFetching, isError: isErrorGet, error: errorGet  } = useGetListQuery()
  //const [addRow, { isError: isErrorAdd, error: errorAdd }] = useAddRowMutation()
  //const [updateRow, {  isError: isErrorUpt, error: errorUpt }] = useUpdateRowMutation()
  // const [deleteRow, {  isError: isErrorDell, error: errorDell}] = useDeleteRowMutation()
  // let isError = isErrorGet ||  isErrorAdd || isErrorUpt || isErrorDell
  // let Error = errorGet || errorAdd || errorUpt || errorDell
  /*const RowExample = {
    ...baseRow,
    ...newRow,
    localID: baseRow.id,
    rowName: "some string",
  }*/

  const [state, dispatch] = useReducer(tableReducer, data, copyState) //вместо RTK Query

  const updateRow = (param: { id: number; updatingRow: RowType }) => {
    dispatch(updateRowAC(param)) //вместо RTK Query

    //updateRow(updatingRow)  RTK Query
  }
  const addRow = (param: { id: number; newRow: RowType }) => {
    dispatch(addRowAC(param)) //вместо RTK Query

    //addRow(updatingRow)  RTK Query
  }
  const delRow = (param: { id: number }) => {
    dispatch(delRowAC(param)) //вместо RTK Query

    //deleteRow(updatingRow)  RTK Query
  }

  //rtk query
  //if(isSuccess) <div>...table</div>
  //if(isFetching) <div>loading</div>
  //if(isError) <div> {error } </div>
  return (
    <div>
      <table>
        <caption>Строительно-Монтажные работы</caption>
        <tbody>
          <TableHeaderRow columNameArr={columnHeaderArr} />
          {state.length > 0 &&
            state.map((r) => (
              <TableRow
                key={r.id}
                row={r}
                updateRow={updateRow}
                addRow={addRow}
                delRow={delRow}
              />
            ))}
        </tbody>
      </table>
    </div>
  )
}

export default Table
