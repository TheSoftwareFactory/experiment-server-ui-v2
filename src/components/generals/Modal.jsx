import React, { Component, PropTypes } from 'react';

/**
 * This is a base component for Modals. This offers methods for opening and
 * closing component and very basic structure of modal.
 * to use import everything you need and just provide content and modalId as
 * props. ID need to be unique string, so open and close modal functions work. 
 */

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
