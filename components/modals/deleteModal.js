import React from 'react'

function DeleteModal({ show, typeOf, cancel, accept, destroy }) {

  return (
    <div style={{display: show ? 'block' : 'none'}} className="deleteModal">
      <div className="modal">
        <div className="modal-content">
          <h3>Are you sure you want {!destroy ? 'delete' : 'destroy'} this {typeOf}? </h3>
          <div className="modal-options">
            <button 
              onClick={() => cancel()} 
              className="submit-button w-button inside-modal-btn ">
              Cancel
            </button>
            <button 
              onClick={() => accept()} 
              className="submit-button w-button inside-modal-btn red-button">
              {!destroy ? 'Delete' : 'Destroy'}
            </button>
          </div>
        </div>
      </div>
      <style jsx>{`
      .deleteModal {
        position: fixed;
        top: 0;
        left: 0;
        width: 200vw;
        height: 1000vh;
        background-color: rgba(0,0,0, .7);
        z-index: 100;
      }
      .modal {
        display: flex;
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        margin: auto;
        width: 50vw;
        height: 30vh;
        background-color: white;
        z-index: 101;
        border-radius: 25px;
      }
      .modal-content {
        margin: auto;
        margin-top: 2em;
      }
      .modal-content h3 {
        font-weight: 400;
      }
      .modal-options {
        display: flex;
        margin-top: 2em;
        padding: 1em;
      }
      `}</style>
    </div>
  )
}

export default DeleteModal