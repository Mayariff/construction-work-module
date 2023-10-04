import s from "./Sidebar.module.scss"
import { createLinksArr } from "./healpers"
import { Link } from "react-router-dom"
import { icons } from "../../assets/icons"
import { useState } from "react"

const linkArr = createLinksArr()

const Sidebar = () => {
  const [isActive, setIsActive] = useState<`СМР` | string>(`СМР`)

  return (
    <aside className={s.container}>
      {linkArr.map((l) => (
        <Link
          to={l.link}
          key={l.name}
          className={isActive === l.name ? `${s.link} ${s.active}` : s.link}
        >
          <img src={icons.menuItem} alt={"menu item"} />
          {l.name}
        </Link>
      ))}
    </aside>
  )
}

export default Sidebar
