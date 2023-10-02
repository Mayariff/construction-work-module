type propsType = {
  columNameArr: string[]
}

const TableHeaderRow = ({ columNameArr }: propsType) => {
  return (
    <tr>
      {columNameArr.map((el) => (
        <th key={el}>{el}</th>
      ))}
    </tr>
  )
}

export default TableHeaderRow