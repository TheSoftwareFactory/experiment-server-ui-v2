import React, { Component } from 'react';
import { Header } from './generals/Generals.jsx'

/**
 * Currenly our "base" class for React routing.
 * Maybe change to HOC
 */
export default class App extends Component{
  render(){
    return (
      <div>
        <Header heading={"Experiment-Server-UI"} />
        {this.props.children}
      </div>
    )};
}
