import React, {Component, PropTypes} from 'react';



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

  onInputField(){
    return(
      <form onSubmit={() =>this.onSubmitClick()}>
        <input type="text" ref="inputValue"></input>
        <button type="submit">Send</button>
      </form>
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
