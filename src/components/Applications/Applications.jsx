import React, {Component} from 'react';
import {getApplications, postApplication,deleteApplication} from '../../action_creators.js'
import {connect} from 'react-redux';
import {Header} from "../generals/Generals.jsx";
import {ModalClass, openModal} from "../generals/Modals.jsx";
import {fromJS} from 'immutable';


/**
 * This is High Order Component for Application.
 * Might redo to a class if needed.
 */
export const ApplicationSmallBox = ({ name, id, onDeleteClick }) => {
    return (
      <div className="Application" key={name}>
        <div className="ApplicationBox">
          <h4>{name}</h4>
          <p>
          <button onClick={() => console.log("moi")}>Edit</button>
          <button onClick={() => onDeleteClick(id)}>Delete</button>
          </p>
        </div>

    </div>)
}

export class ApplicationsBase extends Component {

render(){
  const handleSubmit = value => {
    this.props.onClick(value);
  };
  /**
   * Some params for modal. Modal is still very WIP.
   * What is right lvl of abstraction.
   */
  const modalId = "addApplicationModal";
  const textContent = "Give name for new Application";

  return (
    <div>
      <Header heading={"Experiment-Server-UI"} />

        <div className="ApplicationHeader">
          <h3>Applications</h3>
          <button className="addApplicationButton" onClick={()=>{openModal(modalId)}}> +</button>
          <ModalClass
            modalId={modalId}
            textContent={textContent}
            input={1}
            onSubmit={handleSubmit.bind(this)} />

        </div>
        <div className="Applications">
        {this.props.apps.map((entry,i) =>
          <ApplicationSmallBox
               key={entry.get("id")}
               id={entry.get("id")}
               name={entry.get("name")}
               onDeleteClick={this.props.onDeleteClick}/>
        )}
      </div>
    </div>
  )
  }
}

/**
 * Redux functions for Applications Class.
 */
const mapDispatchToProps = (dispatch) => {
  return {
    onClick: (name) => {
      dispatch(postApplication(name))
    },
    onDeleteClick: (id) => {
      dispatch(deleteApplication(id))
    }
  }
}
/**
 * If state is undefined return loading.
 */
function mapStateToProps(state) {
    return { apps: (state.get('apps') ? state.get('apps')  : fromJS([{id:100, name:"Loading"}]) ) }
}

export const Applications = connect(mapStateToProps, mapDispatchToProps)(ApplicationsBase);
