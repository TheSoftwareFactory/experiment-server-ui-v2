import React, { Component, PropTypes } from 'react';



export const openModal = modalId =>{
    document.getElementById(modalId).style.display = "block"
}

const close = (modalId) =>{
  document.getElementById(modalId).style.display = "none"
}

export class ModalClass extends Component{

  onSubmitClick(){
    this.props.onSubmit(this.refs.inputValue.value);
    this.refs.inputValue.value = "";
    close(this.props.modalId);
  }


  /**
   * Please do not use <form> redux-router does not work then and causes page to reload.
   * And for some reason prevenDefault does not work also.
   */
  onInputField(){
    return(
      <div>
        <input type="text" ref="inputValue"></input>
        <button onClick={() =>this.onSubmitClick()} type="submit">Send</button>
        </div>
    )
  }

  render(){
    return(
      <div id={this.props.modalId} className="modal">
        <div className="modal-content">
          <button onClick={() => close(this.props.modalId)} className="close">x</button>
          {this.props.textContent}
          {this.props.input ? this.onInputField() : []}
        </div>
        </div>
    )
  }
}
ModalClass.PropTypes =
  {
    modalId : PropTypes.string.isRequired
  };
