import s from "./TableHeaderRow.module.scss"

type propsType = {
  columNameArr: string[]
}

const TableHeaderRow = ({ columNameArr }: propsType) => {
  return (
    <thead>
      <tr className={s.row}>
        {columNameArr.map((el) => (
          <th key={el} className={s.cell}>
            {el}
          </th>
        ))}
      </tr>
    </thead>
  )
}

export default TableHeaderRow
