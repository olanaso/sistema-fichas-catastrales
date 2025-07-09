import React from "react";

const ButtonModal = ({ name, type, icon, className, children, id }) => {
  return (
    <>
      <button className={`btn btn-${type} ${className} mx-1`} data-bs-toggle="modal" data-bs-target={`#${id}`}>
        <span>{ name } </span>
        <i className={`fa fa-${icon}`} />
      </button>
      <div className='modal fade' id={id} tabIndex='-1' aria-hidden='true' aria-labelledby={`${id}Label`}>
        <div className='modal-dialog modal-dialog-centered'>
          <div className='modal-content'>
            <div className="modal-body">
              {
                children
              }
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ButtonModal;