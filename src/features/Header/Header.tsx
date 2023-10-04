import s from "./Header.module.scss"
import { Link } from "react-router-dom"
import { icons } from "../../assets/icons"
import { useState } from "react"

const Header = () => {
  const [isActive, setIsActive] = useState<"view" | "control">("view")

  return (
    <div className={s.container}>
      <div className={s.topMenu}>
        <button className={s.btn}>
          <img src={icons.navMenu} alt={"menu"} />
        </button>
        <button className={s.btn}>
          <img src={icons.backArrow} alt={"back"} />
        </button>
        <Link
          to={""}
          className={isActive === "view" ? `${s.link} ${s.active}` : s.link}
          onClick={() => setIsActive("view")}
        >
          Просмотр
        </Link>
        <Link
          to={""}
          className={isActive === "control" ? `${s.link} ${s.active}` : s.link}
          onClick={() => setIsActive("control")}
        >
          Управление
        </Link>
      </div>
      <div className={s.lowerMenu}>
        <div className={s.projectNamesBlock}>
          <h3>Название проекта</h3>
          <span className={s.subText}>Аббревиатура</span>
          <button className={s.buttonOpen}>
            <img src={icons.arrow} alt={"arrow down"} />
          </button>
        </div>
        <h1 className={s.projectName}>Строительно-Монтажные работы</h1>
      </div>
    </div>
  )
}

export default Header
