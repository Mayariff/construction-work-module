import { Link, Outlet ,useNavigate} from "react-router"
import s from "./App.module.scss"
import { useEffect } from "react";
import { PATH } from "./routing";

function App() {

  const navigate = useNavigate()

  useEffect(()=>{
    navigate(PATH.table)
  },[])
  return <div>
    app
      <Outlet />
  </div>
}

export default App
