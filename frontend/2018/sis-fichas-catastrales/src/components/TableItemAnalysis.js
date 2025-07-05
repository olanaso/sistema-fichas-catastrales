import React, { useState } from "react";
import {Link} from "react-router-dom";

const TableItemAnalysis = ({ id, items =[] }) => {
  const [ active, setActive ] = useState(false);

  return (
    <tr className='' onClick={() => setActive(!active)}>
      {
        items.map(item => <td key={item}>{item}</td>)
      }
      <td>
        <a href="#"><i className="fa fa-globe-americas" /></a>
        {
          active && <i className='fa fa-check'/>
        }
      </td>
    </tr>
  )
}

export default TableItemAnalysis;