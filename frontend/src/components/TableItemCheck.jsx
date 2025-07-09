import React from "react";

const TableItemCheck = ({ items = [], id }) => {
  return (
    <tr>
      {
        items.map(item => <td key={item}>{item}</td>)
      }
      <td><input type="checkbox" id={id} /></td>
    </tr>
  )
}

export default TableItemCheck;