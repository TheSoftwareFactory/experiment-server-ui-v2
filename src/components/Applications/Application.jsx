import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Header } from "../generals/Generals.jsx";
import { fromJS } from 'immutable';
import { getApplicationData } from '../../action_creators';

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
    this.props.onLoad(1);
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
      console.log("heips");
      dispatch(getApplicationData(id))
    }
  }
}

function mapStateToProps(state) {
  return { apps: (state.get('apps') ? state.get('apps')  : fromJS([{id:100, name:"Loading"}]) ) }
}

export const Application = connect(mapStateToProps, mapDispatchToProps)(ApplicationBase);
