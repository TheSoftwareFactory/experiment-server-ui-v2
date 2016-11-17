import React, { Component, PropTypes } from 'react';



export const openModal = modalId => {
    document.getElementById(modalId).style.display = "block"
}

const close = modalId => {
  document.getElementById(modalId).style.display = "none"
}

export class ModalClass extends Component{

  onSubmitClick(){
    this.props.onSubmit();

    close(this.props.modalId);
  }


  /**
   * Please do not use <form> redux-router does not work then and causes page to reload.
   * And for some reason prevenDefault does not work also.
   */
   /**
    * This is a bit of hax, when you give table of JSobjects where are text and action pairs
    * this will create button for each with corresponding action.
    * By default after each button click modal will close.
    * Maybe refactor to be more pleasant to use.
    * Own function for easier readability and easier to remove when realising this is
    * a dump gimick.
    */
    inputButtonsActionHelper(ref, action, modalId){
      if(ref){
        action( this.refs[ref].value );
        this.refs[ref].value = "";
      } else {
        action()
      }
      close(modalId)
    }

  inputButtons(namesAndActions,modalId){
    return namesAndActions.map(pair=>{
      if( !(pair.ref)) pair.ref ="";
      return (
        <button
          key={pair.text}
          onClick={ () =>
             { this.inputButtonsActionHelper(pair.ref,pair.action,modalId)}
           }>
          {pair.text}
        </button>)
    })
   }

  inputFields(inputs){
    return inputs.map(input=>{
        return <input key={input.ref} type="text" ref={input.ref}></input>
    })
  }

  render(){
    return(
      <div id={this.props.modalId} className="modal">
        <div className="modal-content">
          <button onClick={() => close(this.props.modalId)} className="close">x</button>
          {this.props.textContent}
          {this.props.inputs ? this.inputFields(this.props.inputs) : []}
          {this.props.buttons ? this.inputButtons(this.props.buttons, this.props.modalId) : []}
          <p>
            <button onClick={()=>close(this.props.modalId)}>Close</button>
          </p>
      </div>
        </div>
    )
  }
}
ModalClass.PropTypes =
  {
    modalId : PropTypes.string.isRequired
  };
