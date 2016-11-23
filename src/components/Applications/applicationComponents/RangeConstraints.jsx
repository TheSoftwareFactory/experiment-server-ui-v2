import React, {Component} from 'react'
import { connect } from 'react-redux';

import { postRangeKey, deleteRangeKey }  from '../../../actions/applicationAsycAC';
import { DataBox } from '../../generals/Generals.jsx'
import { Modal, openModal, closeModal } from "../../generals/Modal.jsx";

export class RangeConstraints extends Component{

  findRightConfigurationKey(app, configKeyId){
    return app.configurationkeys.filter(key=>{
        if(key.id === configKeyId){
          return key;
        }
    })[0]
  }
  render(){
    return(
      <DataBox heading="Range Constrains"
        content={
          <div>
              {this.props.app.rangeconstraints.map(rconst=>{
                return (<div key={rconst.id}>
                  {this.findRightConfigurationKey(this.props.app,rconst.configurationkey_id).name}:
                {this.props.operations[rconst.operator_id -1].human_value} :
              {rconst.value}
              <button onClick={() => this.props.onRangeDeleteClick(this.props.app.id,
                  rconst.configurationkey_id,
                   rconst.id) }>Delete heres</button>
             </div>)
              })}
              <select ref="constkey">
                {this.props.app.configurationkeys.map(key=>{
                  return <option key={"key" + key.id} value={key.id}>{key.name}</option>
                })}
              </select>
              <select ref="operator">
                {this.props.operations.map(op=>{
                  return <option key={"op"+op.id} value={op.id}>{op.human_value}</option>
                })}
              </select>
              <input type="text" ref="value" placeholder="value"></input>
              <p>
              <button onClick={() => this.props.onRangeClick(this.refs.constkey.value, this.refs.operator.value, this.refs.value.value, this.props.app.id )}>Post Range</button>
            </p></div>
        } />
    )
  }
}

const mapDispatchToProps = (dispatch) =>{
 return {
   onRangeClick: (constkey, operator,value, appId) => {
     dispatch(postRangeKey({appId: appId, value: value, operator: parseInt(operator,10), constkey: parseInt(constkey,10)}))
   },
   onRangeDeleteClick: (appId, constkey, rangeKey) => {
     dispatch(deleteRangeKey({appId: appId, constkey: constkey, rangeKey:rangeKey}))
   }
 }
}
export const RangeConstraintsContainer = connect(null,mapDispatchToProps)(RangeConstraints)
