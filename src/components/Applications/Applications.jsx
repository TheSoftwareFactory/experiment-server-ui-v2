import React, {Component} from 'react';
import {getApplications} from '../../action_creators.js'
import {connect} from 'react-redux';
import {Header} from "../generals/Generals.jsx";
import {fromJS} from 'immutable';


/**
 * This is High Order Component for Application.
 * Might redo to a class if needed.
 */
export const Application = ({ name, id, onDeleteClick }) => {
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
  const handleSubmit = event => {
    event.preventDefault();
    this.props.onClick(this.refs.applicationName.value);
    this.refs.applicationName.value = "";
  };

  return (
    <div>
      <Header />

        <div className="ApplicationHeader">
          <h3>Applications</h3>
          <button className="addApplicationButton">+</button>
        </div>
        <div className="Applications">
        {this.props.apps.map((entry,i) =>
          <Application
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
 * <form className="addApplication" onSubmit={handleSubmit}>
 <input ref="applicationName" type="text"></input><button className="right" type="submit">Create new Application </button>
 </form>
 */

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

function mapStateToProps(state) {
    return { apps: (state.get('apps') ? state.get('apps')  : fromJS([{id:100, name:"Loading"}]) ) }
}

export const Applications = connect(mapStateToProps, mapDispatchToProps)(ApplicationsBase);
