import React, {Component} from 'react';
import {getApplications} from '../../action_creators.js'
//import {Application} from "./Application.jsx";

export const Application = ({ name, id, onDeleteClick }) => {
    return (<p key={name}>
    <button >
      <h1>{name}</h1>
    </button>
      <button onClick={() => onDeleteClick(id)}>Delete</button>
    </p>)
}



export const ApplicationsHOC = ({ apps, onClick, onDeleteClick }) => {
  return (
    <div className="Applications">
    <input type="text"></input><button onClick={() => onClick("UusiAppi2")}>Create new Application </button>
    {apps.map((entry,i) =>
      <Application
           key={entry.get("id")}
           id={entry.get("id")}
           name={entry.get("name")}
           onDeleteClick={onDeleteClick}
      />)}

    </div>
  )
}

export default ApplicationsHOC
