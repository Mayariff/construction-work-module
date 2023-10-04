import s from "./ButtonMenu.module.scss"
import { icons } from "../../assets/icons"
import React from "react"

type propsType = {
  onDel: () => void
  onAdd: () => void
  isHover: boolean
  changeHovering: (isHover: boolean) => void
  isEditMode: boolean
  isChild: boolean
  isHoverParentBtnMenu?: boolean
}

const ButtonMenu = React.memo(
  ({
    onDel,
    onAdd,
    isHover,
    changeHovering,
    isEditMode,
    isChild,
    isHoverParentBtnMenu,
  }: propsType) => {
    //появдение и исчезновение кнопки DEL
    const onMouseOverHandler = () => changeHovering(true)
    const onMouseLeaveHandler = () => changeHovering(false)

    let btnStyle = isChild ? `${s.btnMenu} ${s.withLine}` : s.btnMenu

    return (
      <div
        className={isHover ? `${btnStyle} ${s.active}` : btnStyle}
        onMouseOver={onMouseOverHandler}
        onMouseLeave={onMouseLeaveHandler}
      >
        <button onClick={onAdd} disabled={isEditMode}>
          <img src={icons.addItem} alt={"add row"} className={s.img} />
        </button>
        {(isHover || isHoverParentBtnMenu) && (
          <button onClick={onDel}>
            <img
              src={icons.delItem}
              alt={"delete row"}
              className={
                !isHover && !isHoverParentBtnMenu ? s.img2 : `${s.img2}`
              }
            />
          </button>
        )}
      </div>
    )
  },
)

export default ButtonMenu
