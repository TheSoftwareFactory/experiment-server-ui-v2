import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fromJS } from 'immutable';

import { getApplicationData } from '../../actions/action_creators';
import { Header } from "../generals/Generals.jsx";

export const Experiments = ({ name, id, starts, ends}) => {

  return (
    <div className="Experiment" key={name}>

      <h4>{name}</h4>
      <p>
        Test duration: {starts} - {ends}
      </p>
    </div>
  )
}


export class ApplicationBase extends Component {
  componentWillMount() {
    let id  = this.props.location.pathname.replace( /^\D+/g, ''); //strip anything but numbers
    this.props.onLoad(id);
  }

  render() {
    var testDate = Date.now();
    return(
      <div>
        <div className="ApplicationHeader">
          <h3>Applikaation otsikkos</h3>
        </div>

        <div className="SubHeader">
          <h3>Experiments</h3>
        </div>

        <div className="Applications">
          <Experiments
            name={"Kokeen nimi"}
            id={1}
            starts={testDate}
            ends={testDate}
            clientCount={42} />
        </div>

      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLoad: (id) => {
      dispatch(getApplicationData(id))
    }
  }
}

/**
 * CONSIDER to refactor apps state to ordeder set and invent better algorithm.
 */
function mapStateToProps(state) {
  if(!(state.get('applications').isEmpty())){
    let apps = state.get('applications').get('apps');
    return { application: (state.get('applications').get('apps')) }
  } else {
    return {apps: fromJS([{id:100, name:"Loading"}])}
  }
}

export const Application = connect(mapStateToProps, mapDispatchToProps, null, {pure:false})(ApplicationBase);
