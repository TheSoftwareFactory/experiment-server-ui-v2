import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DataBox } from '../../generals/Generals.jsx';


export class ExclusionConstraints extends Component{

mapKeys(configId){
  let a = this.props.app.configurationkeys.filter(key=>{
    if(key.id === configId){
      return key
    }
  })[0];
  return a ? a : "";
}
mapOperations(opId){
  if(this.props.operations[opId -1]  ){
    return this.props.operations[opId -1].human_value;
  }
    return ""
}

  render(){
    return (<DataBox
        heading="Exclusion Constraints"
        content={
          <div>{this.props.app.exclusionconstraints.map(excl=>{
              return <div key={excl.id}>
                {this.mapKeys(excl.first_configurationkey_id).name}
                :
                 {this.mapOperations(excl.first_operator_id)}
                  :
                  { excl.first_value_a ? excl.first_value_a : "" }
                  { excl.first_value_b ? excl.first_value_b : "" }
                   {(this.mapKeys(excl.second_configurationkey_id).name)}
                   {this.mapOperations(excl.second_operator_id)}
                   { excl.second_value_a ? excl.second_value_a : "" }
                   { excl.second_value_b ? excl.second_value_b : "" }
                   <div></div>
               </div>
            })}
            {"if"}  <select ref="constkey1">
                {this.props.app.configurationkeys.map(key=>{
                  return <option key={"keyExc1" + key.id} value={key.id}>{key.name}</option>
                })}
              </select>
              <select ref="operator1">
                {this.props.operations.map(op=>{
                  return <option key={"opExc1"+op.id} value={op.id}>{op.human_value}</option>
                })}
              </select>
              <input type="text" ref="value1"></input>
              {"then"}
              <select ref="constkey2">
                 {this.props.app.configurationkeys.map(key=>{
                   return <option key={"keyExc2" + key.id} value={key.id}>{key.name}</option>
                 })}
               </select>
               <select ref="operator2">
                 {this.props.operations.map(op=>{
                   return <option key={"opExc2"+op.id} value={op.id}>{op.human_value}</option>
                 })}
               </select>
               <input type="text" ref="value1"></input>
          </div>
        }
        ></DataBox>
    )
  }
}
const mapDispatchToProps = (dispatch) => {
  return {

  }
}
function mapStateToProps(state){
  return {}
}

export const ExConstBase = connect(mapStateToProps,mapDispatchToProps)(ExclusionConstraints);
