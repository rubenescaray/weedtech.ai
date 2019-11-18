import React, { useState } from 'react'

function TransferModal({ show, cancel, accept }) {
  const [data, setData] = useState('') 

  const transferFunction = () => {
    accept(data)
  }

  return (
    <div style={{display: show ? 'block' : 'none'}} className="transferModal">
      <div className="modal">
        <div className="modal-content">
          <h3>Input the new owner of your product</h3>
          <input
            onChange={(event) => setData(event.target.value)}
            type="text"
            style={{margin: '0 auto'}}
            className="text-field w-input" 
            maxlength="256"
          />
          <div className="modal-options">
            <button 
              onClick={() => cancel()} 
              className="submit-button w-button inside-modal-btn ">
              Cancel
            </button>
            <button 
              onClick={() => transferFunction()} 
              className="submit-button w-button inside-modal-btn red-button">
              Transfer
            </button>
          </div>
        </div>
      </div>
      <style jsx>{`
      .transferModal {
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
        height: 50vh;
        background-color: white;
        z-index: 101;
        border-radius: 25px;
      }
      .modal-content {
        width: 35vw;
        margin: auto;
        margin-top: 2em;
      }
      .modal-content h3 {
        font-weight: 400;
        margin: 1em auto;
        display: flex;
        justify-content: center;
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

export default TransferModal