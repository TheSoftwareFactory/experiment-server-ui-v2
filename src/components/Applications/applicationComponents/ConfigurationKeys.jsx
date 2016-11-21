import React, {Component} from 'react'
import { connect } from 'react-redux';

import { deleteConfigKey, postConfigKey }  from '../../../actions/action_creators';
import { DataBox } from '../../generals/Generals.jsx'
import { Modal, openModal, closeModal } from "../../generals/Modal.jsx";
export class ConfigurationKeys extends Component{

  render(){
    return(
      <DataBox heading="Configuration Keys"
      content={
        <div>
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
          )}
          <div>
            <p>
              <input type="text" ref="name"></input>
              <select ref="type">
                <option value="boolean">Boolean</option>
                <option value="string">String</option>
                <option value="Integer">Integer</option>
                <option value="Float">Float</option>
              </select>
              <button onClick={()=>{
                              this.props.onConfigAddClick(this.props.app.id, this.refs.name.value,this.refs.type.value );
                              this.refs.name.value = ""} }>
              Add Configuration Key
              </button>
            </p>
          </div>
          </div>
        } />
    )
  }
}


const mapDispatchToProps = (dispatch) =>{
  return {
    onConfigDeleteClick: (appId, configKeyId) => {
      dispatch(deleteConfigKey({appId: appId, keyId: configKeyId}))
    },
    onConfigAddClick: (appId, name, type) => {
      dispatch(postConfigKey({appId: appId, payload: {name:name, type:type }}))
    }
    }
  }
export const ConfigurationKeysContainer = connect(null,mapDispatchToProps)(ConfigurationKeys)
