import React from "react";
import { Children } from "react";
import { Table as TableBoostrap } from "react-bootstrap";

const Table = ({ columns, children }) => {
  return (
    <>
      <TableBoostrap striped bordered hover size="sm">
        <thead>
          <tr>
            {columns.map((col,i) => (
              <th key={`header-${col.key}-${i}`}>{col.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {children}
        </tbody>
      </TableBoostrap>
    </>
  );
};

export default Table;
