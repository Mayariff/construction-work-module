import { ChangeEventHandler, KeyboardEventHandler, useState } from "react"

type propsType = {
  isEdit: boolean
  changeMode: (isEdit: boolean) => void
  value: string | number
  onChange: (param: { value: string | number; inputName: string }) => void
  inputName: string
}

const EditableSpan = ({
  isEdit,
  value,
  changeMode,
  onChange,
  inputName,
}: propsType) => {
  const [editValue, setEditValue] = useState<string>(`${value}`)

  const onDoubleClickHandler = () => changeMode(true)

  const onChangeHandler: ChangeEventHandler<HTMLInputElement> = (e) =>
    setEditValue(e.currentTarget.value)

  const onKeyDownHandler: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter") {
      onChange({ value: editValue, inputName })
    }
  }
  const onBlurHandler = () => onChange({ value: editValue, inputName })

  return (
    <>
      {isEdit ? (
        <div style={{ border: "1px solid black" }}>
          <input
            type={"text"}
            value={editValue}
            onChange={onChangeHandler}
            onKeyDown={onKeyDownHandler}
            onBlur={onBlurHandler}
          />
        </div>
      ) : (
        <span onDoubleClick={onDoubleClickHandler}>{value}</span>
      )}
    </>
  )
}

export default EditableSpan
