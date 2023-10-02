// noinspection JSUnusedLocalSymbols

import { KeyboardEventHandler, useState } from "react"
import { baseRow } from "../../features/Table/apiSlice"
import { RowType } from "../../features"
import { createId } from "../../helpers"
import { ButtonMenu, EditableSpan } from "../index"

type propsType = {
  row: RowType
  updateRow: (param: { id: number; updatingRow: RowType }) => void
  addRow: (param: { id: number; newRow: RowType }) => void
  delRow: (param: { id: number }) => void
  isNewRow?: boolean
  isHoverParentBtnMenu?: boolean
}
export const TableRow = ({
  row,
  updateRow,
  addRow,
  delRow,
  isNewRow = false,
  isHoverParentBtnMenu,
}: propsType) => {
  const [isEdit, setIsEdit] = useState<boolean>(!!isNewRow)
  const [rowValue, setRowValue] = useState<RowType>(row)

  //изменяем режим редактирования в EditMode
  const changeModeHandler = (isEdit: boolean) => setIsEdit((prev) => isEdit)

  // сохряняем  строку при нажатие enter
  const onSaveHandler: KeyboardEventHandler<HTMLTableRowElement> = (e) => {
    if (e.key === "Enter") {
      if (isNewRow) {
        addRow({ id: rowValue.id as number, newRow: rowValue })
      } else {
        updateRow({ updatingRow: rowValue, id: rowValue.id })
      }
      setIsEdit(false)
    }
  }

  // сохраняем промежуточные  изменения в строке
  const onChangeHandler = (param: {
    value: string | number
    inputName: string
  }) => {
    setRowValue((prev) => ({ ...prev, [param.inputName]: param.value }))
  }

  const onAddBTNHandler = () => {
    const childId = createId(rowValue.id as number)
    // noinspection TypeScriptUnresolvedVariable
    const newRow = { ...baseRow, parentId: row.id, id: childId }
    setRowValue((prev) => ({
      ...prev,
      child:
        prev.child && !(prev.child[0] === null)
          ? [...prev.child, newRow]
          : ([newRow] as null[] | RowType[]),
    }))
  }

  const onDelBTNHandler = () => delRow({ id: rowValue.id as number })

  //для изменения поведения кнопок в зависимости от наведения на блок
  const [isHover, setIsHover] = useState<boolean>(false)
  const changeHovering = (isHover: boolean) => setIsHover((prev) => isHover)

  // noinspection TypeScriptUnresolvedVariable
  return (
    <>
      <tr key={rowValue.id} onKeyUp={onSaveHandler}>
        <td>
          {!(isNewRow && isEdit) && (
            <ButtonMenu
              isHover={isHoverParentBtnMenu || isHover}
              changeHovering={changeHovering}
              isEditMode={isEdit}
              onAdd={onAddBTNHandler}
              onDel={onDelBTNHandler}
            />
          )}
        </td>
        <td>
          <EditableSpan
            value={rowValue.rowName}
            isEdit={isEdit}
            changeMode={changeModeHandler}
            onChange={onChangeHandler}
            inputName={"rowName"}
          />
        </td>
        <td>
          <EditableSpan
            value={rowValue.salary}
            isEdit={isEdit}
            changeMode={changeModeHandler}
            onChange={onChangeHandler}
            inputName={"salary"}
          />
        </td>
        <td>
          <EditableSpan
            value={rowValue.equipmentCosts}
            isEdit={isEdit}
            changeMode={changeModeHandler}
            onChange={onChangeHandler}
            inputName={"equipmentCosts"}
          />
        </td>
        <td>
          <EditableSpan
            value={rowValue.overheads}
            isEdit={isEdit}
            changeMode={changeModeHandler}
            onChange={onChangeHandler}
            inputName={"overheads"}
          />
        </td>
        <td>
          <EditableSpan
            value={rowValue.estimatedProfit}
            isEdit={isEdit}
            changeMode={changeModeHandler}
            onChange={onChangeHandler}
            inputName={"estimatedProfit"}
          />
        </td>
      </tr>
      {rowValue.child &&
        !(rowValue.child[0] === null) &&
        rowValue.child.map((r: RowType) => (
          <TableRow
            key={r.id}
            row={r}
            updateRow={updateRow}
            addRow={addRow}
            delRow={delRow}
            isNewRow={r.rowName.length < 1}
            isHoverParentBtnMenu={isHover}
          />
        ))}
    </>
  )
}
export default TableRow
