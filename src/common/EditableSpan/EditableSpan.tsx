import { ChangeEventHandler, KeyboardEventHandler, memo, useState } from "react"
import s from "./EditableSpan.module.scss"
import { fotmatToNumber, fotmatToString, validate } from "./healpers"

type propsType = {
  isEdit: boolean
  changeMode: (isEdit: boolean) => void
  value: string | number
  onChange: (param: { value: string | number; inputName: string }) => void
  inputName: string
  autoFocus?: boolean
}

const EditableSpan = memo(
  ({
    isEdit,
    value,
    changeMode,
    onChange,
    inputName,
    autoFocus = false,
  }: propsType) => {
    const newValue = fotmatToString(value)
    const [editValue, setEditValue] = useState<string>(newValue)
    const [error, setError] = useState<string | null>(null)

    const onDoubleClickHandler = () => changeMode(true)

    const onChangeHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
      setEditValue(fotmatToString(e.currentTarget.value))
      setError(validate(e.currentTarget.value, inputName))
    }

    const onKeyDownHandler: KeyboardEventHandler<HTMLInputElement> = (e) => {
      if (error) {
        return
      }
      if (e.key === "Enter") {
        const savedValue =
          inputName === "rowName" ? editValue : fotmatToNumber(editValue)
        onChange({ value: savedValue, inputName })
      }
    }
    const onBlurHandler = () => {
      if (error === null) {
        const savedValue =
          inputName === "rowName" ? editValue : fotmatToNumber(editValue)
        onChange({ value: savedValue, inputName })
      }
    }

    return (
      <div className={s.container}>
        {isEdit || error ? (
          <input
            type={"text"}
            value={editValue}
            onChange={onChangeHandler}
            onKeyDown={onKeyDownHandler}
            onBlur={onBlurHandler}
            className={error ? `${s.input} ${s.error}` : s.input}
            autoFocus={autoFocus}
          />
        ) : (
          <span onDoubleClick={onDoubleClickHandler}>{newValue}</span>
        )}
        {error && <div className={s.errorText}>{error}</div>}
      </div>
    )
  },
)

export default EditableSpan
