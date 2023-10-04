import {
  KeyboardEventHandler,
  memo,
  useCallback,
  useEffect,
  useState,
} from "react"
import { baseRow } from "../../features/Table/apiSlice"
import { RowType } from "../../features"
import { createId } from "../../helpers"
import { ButtonMenu, EditableSpan } from "../index"
import s from "./TableRow.module.scss"

type propsType = {
  row: RowType
  updateRow: (param: { id: number; updatingRow: RowType }) => void
  addRow: (param: { id: number; newRow: RowType }) => void
  delRow: (param: { id: number }) => void
  isNewRow?: boolean
  isHoverParentBtnMenu?: boolean
  level?: number
}
export const TableRow = memo(
  ({
    row,
    updateRow,
    addRow,
    delRow,
    isNewRow = false,
    isHoverParentBtnMenu = false,
    level,
  }: propsType) => {
    const [isEdit, setIsEdit] = useState<boolean>(!!isNewRow)
    const [rowValue, setRowValue] = useState<RowType>(row)
    useEffect(() => setRowValue(row), [row])

    //изменяем режим редактирования в EditMode
    const changeModeHandler = useCallback(
      (isEdit: boolean) => setIsEdit((prev) => isEdit),
      [],
    )

    // сохряняем  строку при нажатие enter
    const onSaveHandler: KeyboardEventHandler<HTMLTableRowElement> = (e) => {
      if (e.key === "Enter") {
        if (isNewRow) {
          addRow({ id: rowValue.parentId as number, newRow: rowValue })
        } else {
          updateRow({ updatingRow: rowValue, id: rowValue.id })
        }
        setIsEdit(false)
      }
    }

    // сохраняем промежуточные  изменения в строке
    const onChangeHandler = useCallback(
      (param: { value: string | number; inputName: string }) => {
        setRowValue((prev) => ({ ...prev, [param.inputName]: param.value }))
      },
      [],
    )

    const onAddBTNHandler = useCallback(() => {
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
    }, [])

    const onDelBTNHandler = useCallback(() => {
      delRow({ id: rowValue.id as number })
    }, [])

    //для изменения поведения кнопок в зависимости от наведения на блок
    const [isHover, setIsHover] = useState<boolean>(false)
    const changeHovering = useCallback(
      (isHover: boolean) => setIsHover((prev) => isHover),
      [],
    )

    //css
    const RowLevel = level || 1
    let childStyle
    if (RowLevel === 2) {
      childStyle = `${s.cell} ${s.child2}`
    } else if (RowLevel === 3) {
      childStyle = `${s.cell} ${s.child3}`
    } else if (RowLevel === 4) {
      childStyle = `${s.cell} ${s.child4}`
    } else if (RowLevel === 5) {
      childStyle = `${s.cell} ${s.child5}`
    }

    return (
      <>
        <tr key={rowValue.id} onKeyUp={onSaveHandler} className={s.row}>
          <td className={rowValue.parentId ? childStyle : s.cell}>
            {!(isNewRow && rowValue.rowName.length === 0 && isEdit) && (
              <ButtonMenu
                isChild={!!rowValue.parentId}
                isHover={isHoverParentBtnMenu || isHover}
                changeHovering={changeHovering}
                isEditMode={isEdit}
                onAdd={onAddBTNHandler}
                onDel={onDelBTNHandler}
              />
            )}
          </td>
          <td className={s.cell}>
            <EditableSpan
              autoFocus={true}
              value={rowValue.rowName}
              isEdit={isEdit}
              changeMode={changeModeHandler}
              onChange={onChangeHandler}
              inputName={"rowName"}
            />
          </td>
          <td className={s.cell}>
            <EditableSpan
              value={rowValue.salary}
              isEdit={isEdit}
              changeMode={changeModeHandler}
              onChange={onChangeHandler}
              inputName={"salary"}
            />
          </td>
          <td className={s.cell}>
            <EditableSpan
              value={rowValue.equipmentCosts}
              isEdit={isEdit}
              changeMode={changeModeHandler}
              onChange={onChangeHandler}
              inputName={"equipmentCosts"}
            />
          </td>
          <td className={s.cell}>
            <EditableSpan
              value={rowValue.overheads}
              isEdit={isEdit}
              changeMode={changeModeHandler}
              onChange={onChangeHandler}
              inputName={"overheads"}
            />
          </td>
          <td className={s.cell}>
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
          rowValue.child.length > 0 &&
          !(rowValue.child[0] === null) &&
          rowValue.child.map((r: RowType) => (
            <TableRow
              key={r.id}
              row={r}
              updateRow={updateRow}
              addRow={addRow}
              delRow={delRow}
              level={RowLevel + 1} /*для отступов при  рисовке*/
              isHoverParentBtnMenu={
                isHover || isHoverParentBtnMenu
              } /*есть наведение на кнопки у элемента или родителя*/
              isNewRow={
                r.rowName.length < 1
              } /*новаяя строка или нет (для отображения значков)*/
            />
          ))}
      </>
    )
  },
)
export default TableRow
