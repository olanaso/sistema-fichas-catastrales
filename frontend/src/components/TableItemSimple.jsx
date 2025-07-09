import React from "react";

const TableItemSimple = ({ items = [], pair = true }) => {
  return (
    <tr className={`table-item ${pair && 'table-item--i'}`}>
      {
        items.map(item => <td key={item}>{item}</td>)
      }
    </tr>
  )
}

export default TableItemSimple;