import React from 'react';
import Application from "./Application.jsx";
import {getApplications} from '../../action_creators.js'

const ApplicationsHOC = ({ apps, onClick, onDeleteClick }) => {

  return (
    <div className="Applications">
    {apps.map((entry,i) =>
      <Application key={entry.get("id")} id={entry.get("id")} name={entry.get("name")} onDeleteClick={onDeleteClick}/>
    )}
    <button onClick={() => onClick("UusiAppi2")}></button>
    </div>
  )
}

export default ApplicationsHOC
