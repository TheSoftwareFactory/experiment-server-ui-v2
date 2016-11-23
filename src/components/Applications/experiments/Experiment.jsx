import React, { Component } from 'react';
import { connect } from 'react-redux'


import { getExperiments } from '../../../actions/experimentAC'
import { DataBox, SubHeader } from '../../generals/Generals.jsx';
export class ExperimentBase extends Component{

  componentWillMount(){
    this.props.onLoad()
  }
  render(){
    return(<div>
        <SubHeader heading="EXPERIMENT" />
        {this.props.experiments.map(expr=>{
          return <div key={expr.id}>{expr.name}</div>
        })}

        </div>)
  }
}
const mapDispatchToProps = (dispatch,ownProps) =>{
 return {
   onLoad: () =>{
     dispatch(getExperiments(ownProps.params.id));
   }
 }
}
function mapStateToProps(state, ownProps){
  return {experiments : state.get('experiments').toJS()}
}

export const Experiment = connect(mapStateToProps,mapDispatchToProps)(ExperimentBase)
