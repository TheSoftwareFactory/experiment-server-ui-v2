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

  render() {
    const id  = this.props.location.pathname.replace( /^\D+/g, '');
    const index = this.props.apps.findIndex(map=>{ return map.get('id') === parseInt(id,10)  });

    if ( index === -1 ) return this.notYetReadyRender() //indicates we have not yet loaded app

    const thisApp = this.props.apps.get(index).toJS(); //plainJS or immutableJS? If we only access it ?

    if( !(thisApp.configurationkeys) ) return this.notYetReadyRender() //indicates we have not yet loaded app details

    return(
      <div>
        <div className="ApplicationHeader">
          <h3>{thisApp.name}</h3>
        </div>

        <div className="SubHeader">
          <h3>Overview</h3>
        </div>

        <div className="Applications">
          <div>
            <h4>Configuration Keys</h4>
            {thisApp.configurationkeys.map(key =>{
              return(<div key={key.id}>
                {key.name} : {key.type}
              </div>)
            })}
          </div>
        </div>

          <h3>Configuration Keys</h3>
        <div className="Applications">
          <div>
            <h4>Configuration Keys</h4>
            {thisApp.configurationkeys.map(key =>{
              return(<div key={key.id}>
                {key.name} : {key.type}
                <Modal
                  modalId={"deleteConfigKey" + key.name}
                  content={
                    <div>
                    "Are you sure you want to delete "  {key.name}
                    <button onClick={()=> {this.props.onConfigDeleteClick(thisApp.id, key.id); closeModal("deleteConfigKey" + key.name)}  }>
                        Delete Configuration Key
                      </button>
                  </div> }
                />
              <button onClick={() => openModal("deleteConfigKey" + key.name)}>Delete </button>
              </div>)
            })}


            <Modal
                modalId={"addConfigKey"}
                content={<div>
                  Add new Configuration Key
                  <input type="text" ref="name"></input>
                  <select ref="type">
                    <option value="boolean">Volvo</option>
                    <option value="string">Sab</option>
                    <option value="Integer">Mercedes</option>
                    <option value="Float">Audi</option>
                  </select>
                  <button onClick={()=>{
                                  this.props.onConfigAddClick(thisApp.id, this.refs.name.value,this.refs.type.value );
                                  closeModal("addConfigKey")} }>
                  Add Configuration Key
                </button>
              </div>}
              />
              <button onClick={()=>openModal("addConfigKey")}>add new one </button>
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
                Are you sure you want to delete  {thisApp.name}

                <button onClick={()=>
                    {
                      this.props.onDeleteClick(thisApp.id);
                      closeModal("deleteApplication");
                    }
                  }>
                  Delete Appliation
                </button>
                </div>
              } />
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
      console.log({appId: appId, payload: {name:name, type:type }});
      //dispatch(ac.postConfigKey({appId: appId, keyId: configKeyId, payload: {name:name, type:type }}))
    }
  }
}

/**
 * CONSIDER to refactor apps state to ordeder set and invent better algorithm.
 */
function mapStateToProps(state, ownProps) {
  if((state.get('applications').get('apps'))){
    return { apps: (state.get('applications').get('apps')) }
  } else {
    return {apps: fromJS([{id:100, name:"Loading"}])}
  }
}

export const Application = connect(mapStateToProps, mapDispatchToProps, null, {pure:false})(ApplicationBase);
