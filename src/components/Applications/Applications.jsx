import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fromJS } from 'immutable';
import { Link } from 'react-router'

import { getApplications, postApplication,deleteApplication } from '../../actions/action_creators.js'
import { Header } from "../generals/Generals.jsx";
import { closeModal, Modal, openModal } from "../generals/Modal.jsx";


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
          <Link to={'/applications/' + id } activeClassName="active">Nappi</Link>
          </p>
        </div>
    </div>)
}

export class ApplicationsBase extends Component {

componentWillMount(){
  this.props.onPageLoad();
}

render(){
  /**
   * Some params for modal. Modal is still very WIP.
   * What is right lvl of abstraction.
   */
  const modalId = "addApplicationModal";

  return (
<div>
        <div className="ApplicationHeader">
          <h3>Applications</h3>
          <button className="addApplicationButton" onClick={()=>{openModal(modalId)}}> +</button>
          <Modal
            modalId={modalId}
            content={
              <div>
              Give name for new Application
              <input type="text" ref="appName"></input>
              <button onClick={()=>{this.props.onClick(this.refs.appName.value); closeModal(modalId) }}>Add new Application</button>
            </div>
          }/>
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
    onPageLoad: () =>{
      dispatch(getApplications())
    }
  }
}
/**
 * If state is undefined return loading.
 */
function mapStateToProps(state) {
    return { apps: (state.get('applications').get('apps') ? state.get('applications').get('apps')  : fromJS([{id:100, name:"Loading"}]) ) };
}

export const Applications = connect(mapStateToProps, mapDispatchToProps, null, {pure:false})(ApplicationsBase);
