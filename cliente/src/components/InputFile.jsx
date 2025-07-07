import React, { useState } from "react";

const InputFile = ({ name }) => {
  const [ drag, setDrag ] = useState(false);

  return (
    <div className={`input-file ${drag && 'dragin'}`}
         onDragLeave={() => setDrag(false)}
         onDragOver={() => setDrag(true)}>
      <div>
        <p>Arrastre y suelte los archivos aquí</p>
        <p>O</p>
        <input type="file" name={name} id={name} />
        <label htmlFor={name} className="btn btn-file">Seleccione</label>
      </div>
    </div>
  )
}

export default InputFile;