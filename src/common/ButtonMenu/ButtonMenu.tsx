type propsType = {
  onDel: () => void
  onAdd: () => void
  isHover: boolean
  changeHovering: (isHover: boolean) => void
  isEditMode: boolean
}

const ButtonMenu = ({
  onDel,
  onAdd,
  isHover,
  changeHovering,
  isEditMode,
}: propsType) => {
  //появдение и исчезновение кнопки DEL
  const onMouseOverHandler = () => changeHovering(true)
  const onMouseLeaveHandler = () => changeHovering(false)

  return (
    <div
      style={{ border: "1px solid black" }}
      onMouseOver={onMouseOverHandler}
      onMouseLeave={onMouseLeaveHandler}
    >
      <button onClick={onAdd} disabled={isEditMode}>
        Add
      </button>
      {isHover && <button onClick={onDel}>DEL</button>}
    </div>
  )
}

export default ButtonMenu
