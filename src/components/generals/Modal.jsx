import React, { Component, PropTypes } from 'react';



export const openModal = modalId => {
    document.getElementById(modalId).style.display = "block"
}

export const closeModal = modalId => {
  document.getElementById(modalId).style.display = "none"
}

export class Modal extends Component{


  render(){
    return(
      <div id={this.props.modalId} className="modal">
        <div className="modal-content">
          <button onClick={() => closeModal(this.props.modalId)} className="close">x</button>
          {this.props.content}
          <p>
            <button onClick={()=>closeModal(this.props.modalId)}>Close</button>
          </p>
      </div>
        </div>
    )
  }
}
Modal.PropTypes =
  {
    modalId : PropTypes.string.isRequired
  };
