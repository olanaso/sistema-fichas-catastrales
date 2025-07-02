import React from "react";


const TableRow = ({data,acciones}) => {
  return (
    <>
        <tr>
          {Object.values(data).map((value, i) => (
            <td key={`data-${i}`}>{value}</td>
          ))}
          <td className="derecha" >
           {acciones}
          </td>
        </tr>
    </>
  );
};

export default TableRow;
