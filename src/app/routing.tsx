import { createBrowserRouter } from "react-router-dom"
import { Table } from "../features"
import App from "./App"
import { ErrorPage } from "../common"

export enum PATH {
  table = "/construction-table",
}

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: PATH.table,
        element: <Table />,
      },
    ],
  },
])
