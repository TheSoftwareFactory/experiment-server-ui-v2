/* This class is no longer in use. Kept here for example purpose.
Please refaktor when MVP ready.


import React, {Component} from 'react';
import Application from "./Application.jsx"
import {connect} from 'react-redux';
import * as actionCreators from '../../action_creators.js'
import {CreateApplicationContainer} from './CreateApplication.jsx'

export class Applications extends Component{
  render() {
    return (<div className="Applications">
    {this.props.apps.map(entry =>
      <Application key={entry.id} name={entry.name}/>
    )}
    <button onClick={() => onClick()}></button>
    </div>)
  }
}

/**
 * Map State to Props, funky map loop becouse Redux returns immutable List full
  of immutable Maps. So Maybe fix this ? Or atleast find out why.

function mapStateToProps(state) {
    let listOfValue = state.get('apps');
    let ab = listOfValue.toArray().map(mappi =>{
      return mappi.toObject();
    });
    return { apps: ab }
}
export const ApplicationsContainer = connect(mapStateToProps)(Applications)
*/
