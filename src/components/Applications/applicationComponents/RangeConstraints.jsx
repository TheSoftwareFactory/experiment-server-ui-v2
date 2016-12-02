import React, {Component} from 'react'
import { connect } from 'react-redux';

import { postRangeKey, deleteRangeKey }  from '../../../actions/applicationAsycAC';
import { DataBox } from '../../generals/Generals.jsx'
import { Modal, openModal, closeModal } from "../../generals/Modal.jsx";



export class RangeConstraints extends Component{

  findRightConfigurationKey(configKeyId){
    const id = parseInt(configKeyId);
    return this.props.app.configurationkeys.filter(key=>{
        if(key.id === id){
          return key;
        }
    })[0]
  }

  chooseInputType(keyId){
    const key = this.findRightConfigurationKey(parseInt(keyId,10));

    if( key.type === "Integer" ){
      return   (<div><input ref="value" type={"number"} /> Integer</div>)
    }
    if( key.type === "string" ){
      return   (<div><input ref="value" type="text" /> Text</div>)
    }
    if( key.type === "Float" ){
      return   (<div> <input ref="value" type="number" step="0.01" /> Float (0.01)
    </div>)
    } else return <div></div>
  }

  listRanges(rconst){
    return(<div key={rconst.id}>
      {this.findRightConfigurationKey(rconst.configurationkey_id).name}:
    {this.props.operations[rconst.operator_id -1].human_value} :
  {rconst.value}
  <button onClick={() => this.props.onRangeDeleteClick(this.props.app.id,
      rconst.configurationkey_id,
       rconst.id) }>Delete heres</button>
 </div>)
  }
  postButton(){

    return(<p>
      <button  onClick={()=>this.checkValid()}>Ei tee mitään</button></p>)
  }
  /**
   * I dont't even know what I am trying to do
   */
  checkValid(){
    if(this.refs.value.value == ""){
      return;
    }

    let errors = 0;
    for (var i = 0; i < this.props.app.rangeconstraints.length; i++) {
      if(this.props.app.rangeconstraints[i].configurationkey_id == this.refs.constkey.value){
        if( eval(this.props.app.rangeconstraints[i].value + this.props.operations[this.refs.operator.value - 1].math_value + this.refs.value.value)){
        } else {
          errors++
        }
      }
    }
    if(errors > 0){
      alert("please check your ranges");
      this.refs.value.value = "";
    } else{
      this.props.onRangeClick(this.refs.constkey.value, this.refs.operator.value, this.refs.value.value, this.props.app.id )
      this.refs.value.value = "";
    }
  }
////) => this.props.onRangeClick(this.refs.constkey.value, this.refs.operator.value, this.refs.value.value, this.props.app.id )}>Post Range</button>
  chooseOperation(constkey){
    const key = this.findRightConfigurationKey(constkey);
    return(<select ref="operator"> {this.props.operations.map(op=>{
      if(key.type==="string" && [1,6].includes(op.id)){
          return (<option key={"opRange" + op.id} value={op.id} >{op.human_value}</option>)
      } if(key.type!=="string" && op.id>1 && op.id < 6){
        return (<option key={"opRange" + op.id} value={op.id} >{op.human_value}</option>)
      }
    })}
  </select>)
  }
  /**
   * To create ui for adding new range key.
   * uses React forceUpdate to update component view.
   * TODO find more reactive way to handle this.
   */
  addNewRange(){
    let constkey;
    try {
      constkey = this.refs.constkey.value;
    } catch (e) {
      constkey = this.props.app.configurationkeys.filter(key=>{
        if(key.type !== "boolean"){
          return key
        }
      })[0].id
    } finally {
      return (<div> <select onChange={()=>this.forceUpdate()} ref="constkey">
        {this.props.app.configurationkeys.map(key=>{
          if(key.type !== "boolean"){
            return (<option value={key.id} key={key.id + "configKey"}>
                {key.name}
              </option> )}})}
       </select>
       {this.chooseOperation(constkey)}
       {this.chooseInputType(constkey)}
       </div>)
    }
  }
  checkIfEmpty(){
    if(this.props.app.configurationkeys.length === 0){
      return (<div>Please add Configration Keys first.</div>)
    } else {
      return (          <div>
                  {this.props.app.rangeconstraints.map(rconst=>{
                    return (this.listRanges(rconst))
                  })}
                  {this.addNewRange()}
                  {this.postButton()}

                </div>)
    }
  }

  render(){
    return(
      <DataBox heading="Range Constrains"
        content={ this.checkIfEmpty() } />
    )
  }
}
/**
 * Maybe add RangeProps where are are limited config keys and limited operators.
 */
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
