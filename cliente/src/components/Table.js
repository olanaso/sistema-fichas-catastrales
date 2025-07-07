import React from "react";

const Table = ({ head = [], children }) => {
  return (
    <table className="table table-hover table-list">
      <thead>
        <tr className='table-head'>
          {
            head.map(head => <th key={head}>{head}</th>)
          }
        </tr>
      </thead>
      <tbody>
        {
          children
        }
      </tbody>
    </table>
  )
}

export default Table;