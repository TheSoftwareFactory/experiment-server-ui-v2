import React, {Component} from 'react';
import {getApplications} from '../../action_creators.js'
//import {Application} from "./Application.jsx";

/**
 * This is High Order Component for Application.
 * Might redo to a class if needed.
 */

export const Application = ({ name, id, onDeleteClick }) => {
    return (<p key={name}>
    <button >
      <h1>{name}</h1>
    </button>
      <button onClick={() => onDeleteClick(id)}>Delete</button>
    </p>)
}

export class Applications extends Component {

render(){
  const handleSubmit = event => {
    event.preventDefault();
    this.props.onClick(this.refs.applicationName.value);
    this.refs.applicationName.value = "";
  };

  return (
    <div className="Applications">
    <form onSubmit={handleSubmit}>
    <input ref="applicationName" type="text"></input><button type="submit">Create new Application </button>
    </form>
    {this.props.apps.map((entry,i) =>
      <Application
           key={entry.get("id")}
           id={entry.get("id")}
           name={entry.get("name")}
           onDeleteClick={this.props.onDeleteClick}
      />)}
    </div>)
  }
}

//export default ApplicationsHOC
