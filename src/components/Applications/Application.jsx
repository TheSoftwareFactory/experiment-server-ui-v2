import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fromJS } from 'immutable';
import * as ac from '../../actions/action_creators';
import { Header } from "../generals/Generals.jsx";
import { Modal, openModal, closeModal } from "../generals/Modal.jsx";


export class ApplicationBase extends Component {

  componentWillMount() {
    this.props.onLoad();
  }

  notYetReadyRender(){
    return ( <div className="ApplicationHeader">
        <h3>Loading ... </h3>
      </div> )
  }

  findRightConfigurationKey(app, configKeyId){
    return app.configurationkeys.filter(key=>{
        if(key.id === configKeyId){
          return key;
        }
    })[0]
  }
  render() {
    /*
    console.log(this.props.app);
    //TODO refactor this to mapStateToProps so in props there is only 1 app.
    const id  = this.props.location.pathname.replace( /^\D+/g, '');
    const index = this.props.apps.findIndex(map=>{ return map.get('id') === parseInt(id,10)  });

    if ( index === -1 ) return this.notYetReadyRender() //indicates we have not yet loaded app

    const this.props.app = this.props.apps.get(index).toJS(); //plainJS object of app we want to use.
*/
    if( !(this.props.app.configurationkeys) ) return this.notYetReadyRender() //indicates we have not yet loaded app details

    return(
      <div>
        <div className="ApplicationHeader">
          <h3>{this.props.app.name}</h3>
        </div>

          <h3>Overview</h3>

        <div className="Applications">
          <div>
            <h4>Configuration Keys</h4>
            {this.props.app.configurationkeys.map(key =>{
              return(<div key={key.id}>
                {key.name} : {key.type}
              </div>)
            })}
            <p>
              UUID: AHSD-123H-12HS-123F-ASDJ
            </p>
          </div>
        </div>
        <div>
          <h3>Range Constrains</h3>
          <div className="Applications">
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
            <button onClick={() => this.props.onRangeClick(this.refs.constkey.value, this.refs.operator.value, this.refs.value.value, this.props.app.id )}>Post Range </button>
          </p></div>
        </div>
        <h3>Configuration Keys</h3>

        <div className="Applications">
          <div>
            <h4>Configuration Keys</h4>
              {this.props.app.configurationkeys.map(key =>{
                return(<div key={key.id}>
                  {key.name} : {key.type}
                  <Modal
                    modalId={"deleteConfigKey" + key.name}
                    content={
                      <div>
                      "Are you sure you want to delete "  {key.name}
                      <button onClick={()=> {this.props.onConfigDeleteClick(this.props.app.id, key.id); closeModal("deleteConfigKey" + key.name)}  }>
                          Delete Configuration Key
                        </button>
                    </div> }
                />
              <button onClick={() => openModal("deleteConfigKey" + key.name)}>Delete </button>
              </div>
            )}
          )};
          <div>
            <p>
              <input type="text" ref="name"></input>
              <select ref="type">
                <option value="boolean">Volvo</option>
                <option value="string">Sab</option>
                <option value="Integer">Mercedes</option>
                <option value="Float">Audi</option>
              </select>
              <button onClick={()=>{
                              this.props.onConfigAddClick(this.props.app.id, this.refs.name.value,this.refs.type.value );
                              this.refs.name.value = ""} }>
              Add Configuration Key
              </button>
            </p>
          </div>
        </div>
      </div>

      <h3>Danger Zone</h3>
      <div className="Applications">
        <div>
          <h4>Delete this Application</h4>
          <Modal
            modalId="deleteApplication"
            content={
              <div>
                Are you sure you want to delete  {this.props.app.name}
                <button onClick={()=>
                    {
                      this.props.onDeleteClick(this.props.app.id);
                      closeModal("deleteApplication");
                    }
                  }>
                  Delete Appliation
                </button>
              </div>}
           />
          <button onClick={() => openModal("deleteApplication")}>Delete this app </button>
        </div>
      </div>
    </div>
    )
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onLoad: () => {
      dispatch(ac.getApplicationData(ownProps.location.pathname.replace( /^\D+/g, '')))
    },
    onDeleteClick: (id) => {
      ownProps.router.push("/applications")
      dispatch(ac.deleteApplication(id));
    },
    onConfigDeleteClick: (appId, configKeyId) => {
      dispatch(ac.deleteConfigKey({appId: appId, keyId: configKeyId}))
    },
    onConfigAddClick: (appId, name, type) => {
      dispatch(ac.postConfigKey({appId: appId, payload: {name:name, type:type }}))
    },
    onRangeClick: (constkey, operator,value, appId) => {
      dispatch(ac.postRangeKey({appId: appId, value: value, operator: parseInt(operator,10), constkey: parseInt(constkey,10)}))
    },
    onRangeDeleteClick: (appId, constkey, rangeKey) => {
      console.log({appId: appId, constkey: constkey, rangeKey:rangeKey});
      dispatch(ac.deleteRangeKey({appId: appId, constkey: constkey, rangeKey:rangeKey}))
    }
  }
}

/**
 * CONSIDER to refactor apps state to ordeder set and invent better algorithm.
 */
function mapStateToProps(state, ownProps) {
  let allApps = state.get('applications')
  if(allApps){
    const index = allApps.findIndex(map=>{ return map.get('id') === parseInt(ownProps.params.id,10)  });
    if ( index === -1 ) return {app: [{id:100, name:"Loading"}]} //indicates we have not yet loaded app
    return {operations: state.get('operations').toJS(), app: allApps.get(index).toJS() }
  }
  else {
    return {app: [{id:100, name:"Loading"}] }
  }
}

export const Application = connect(mapStateToProps, mapDispatchToProps)(ApplicationBase);
