import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DataBox } from '../../generals/Generals.jsx';
import { postExclConsAction, deleteExclConsAction }  from '../../../actions/applicationAsycAC';

/**
 * This class is terrible. Try find time to refactor it to better.
 * purpose of this class is to render ExclusionConstraints and add possibility to more of them.
 */

export class ExclusionConstraints extends Component{

/**
 * Chooses what type of input is expected
 */
  chooseInputType(refid){
    const ref = "operator" + ref;
    const refA = "value" + refid +"a";
    const refB = "value" + refid +"b"
    const key = this.chooseConstKey(refid)
    if (key.type === "boolean"){
        return   (<div><input ref={refA} type="radio" /> True </div>)
    }
    if(key.type === "Integer"){
      if(this.refs[ref]){
        if(["7","8"].includes(this.refs[ref].value)){
          return (<div><input ref={refA} type="number" /> Integer
          <input ref={refB} type="number" /> Integer</div>)
        }
      }
      return   (<div><input ref={refA} type="number" /> Integer</div>)
    }
    if(key.type=== "string"){
      return   (<div><input ref={refA} type="text" /> Text</div>)
    }
    if(key.type=== "Float"){
      if(this.refs[ref]){
        if(["7","8"].includes(this.refs[ref].value)){
          return (<div><input ref={refA} type="number" /> Float
          <input ref={refB} type="number" step="0.01"/> Float</div>)
        }
      }
      return   (<div><input ref={refA} type="number" step="0.01" /> Float (0.01)</div>)
    }
  }

/**
 * To map right keyId to right key.
 * TODO this same function is also implemented in other clases.
 * TODO move this upper and add use only one.
 * TODO I think Array.prototype.find would be better than Array.prototype.filter here.
 */
mapKeys(configId){
  let a = this.props.app.configurationkeys.filter(key=>{
    if(key.id === configId){
      return key
    }
  })[0];
  return a ? a : ""; //if there is nothing return empty string
}
/**
 * Map operationId to operation Object.
 */
mapOperations(opId){
    return (this.props.operations[opId -1] ? this.props.operations[opId -1].human_value : "");
}
/**
 * Using id find configKey.
 * TODO
 */
chooseConstKey(refId){
  let constkey;
  try {
     constkey = this.refs["constkey"+refId].value;
  } catch (e) {
     constkey = this.props.app.configurationkeys[0].id
  } finally {
    const key = this.mapKeys(parseInt(constkey,10));
    return key;
  }
}
/**
 * Since for Configuration keys have static types only subset of all operators are available to use
 * this function uses opeators IDs to choose that only right operators are avainlable for certain
 * Configuration Key.
 */
chooseOperations(refId){
  const key = this.chooseConstKey(refId);
  let listOfIds;
  if(key.type === "string" || key.type === "boolean"){
    listOfIds = [1,6]
  } else {
    listOfIds = [1,2,3,4,5,6,7,8]
  }
  if(parseInt(refId,10) === 2){
    /**
     * If this is later part add must defines and must not defines.
     */
    listOfIds.push(9);
    listOfIds.push(10);
  }
return( <select onChange={()=>this.forceUpdate()} ref={ "operator" + refId }>
      {this.props.operations.map(op=>{
        if(listOfIds.includes(op.id))
        return <option key={"opExc1"+op.id} value={op.id}>{op.human_value}</option>
      })}
    </select>)
}
/**
 * First gather data from refs and then dispatch it.
 */
postData(){
  const appId = this.props.app.id;
  const constkey1 = this.refs.constkey1.value;
  const constkey2 = this.refs.constkey2.value;
  const value1 = this.refs.value1a.value;
  const value1b = this.refs.value1b ?  this.refs.value1b.value : "";
  const value2 = this.refs.value2a.value;
  const value2b = this.refs.value2b ?  this.refs.value2b.value : "";
  const operator1 = this.refs.operator1.value;
  const operator2 = this.refs.operator2.value;

  let payload = {
    "first_configurationkey_id": parseInt(constkey1,10),
    "first_operator_id": parseInt(operator1,10),
    "first_value": [value1,value1b],
    "second_configurationkey_id": parseInt(constkey2,10),
    "second_operator_id": parseInt(operator2,10),
    "second_value": [value2,value2b]
  }
  this.props.onPostExcl({app: appId, payload: payload});
}

/**
 * Poorly named function.
 * check if there are any configurationkeys and depending on that renders
 * either core or empty div.
 * TODO Should move core-rendering to some other function.
 */
checkIfEmpty(){
  if(this.props.app.configurationkeys.length === 0 ){
    return <div>Please insert configurationkeys first</div>
  } return (<div>{this.props.app.exclusionconstraints.map(excl=>{
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
             <div><button onClick={ ()=>{
                 this.props.onDeleteExclClick(this.props.app.id,
                    excl.first_configurationkey_id,
                  excl.id)
               } }>Delete Exclusion Constraint</button></div>
         </div>
      })}
      {"if"}  <select onChange={()=>this.forceUpdate()} ref="constkey1"> //{"if"} since this is jsx and I only want string "if".
          {this.props.app.configurationkeys.map(key=>{
            return <option key={"keyExc1" + key.id} value={key.id}>{key.name}</option>
          })}
        </select>
        {this.chooseOperations(1)}
        {this.chooseInputType(1)}
        <div></div>
        then
        <div></div>
        <select onChange={()=>this.forceUpdate()} ref="constkey2">
           {this.props.app.configurationkeys.map(key=>{
             return <option key={"keyExc2" + key.id} value={key.id}>{key.name}</option>
           })}
         </select>
         {this.chooseOperations(2)}
         {this.chooseInputType(2)}
         <button onClick={() => this.postData()}>Paina tästä</button>
    </div>)

}
/**
 * Refactor a lot.
 */
  render(){
    return (<DataBox
        heading="Exclusion Constraints"
        content={this.checkIfEmpty()}></DataBox>
    )
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    onDeleteExclClick: (appId, ckId, exclId) =>{
      dispatch(deleteExclConsAction({appId: appId, ckId: ckId, exclId: exclId}));
    },
    onPostExcl: (payload) =>{
      dispatch(postExclConsAction(payload));
    }
  }
}

export const ExConstBase = connect(null,mapDispatchToProps)(ExclusionConstraints);
