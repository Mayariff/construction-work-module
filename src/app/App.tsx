import { Outlet, useNavigate } from "react-router"
import s from "./App.module.scss"
import { useEffect } from "react"
import { PATH } from "./routing"
import { Header, Sidebar } from "../features"

function App() {
  const navigate = useNavigate()

  useEffect(() => {
    navigate(PATH.table)
  }, [])
  return (
    <div className={s.container}>
      <Header />
      <main className={s.content}>
        <Sidebar />
        <Outlet />
      </main>
    </div>
  )
}

export default App
