import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fromJS } from 'immutable';
import { Router } from 'react-router'
import { getApplicationData, deleteApplication } from '../../actions/action_creators';
import { Header } from "../generals/Generals.jsx";
import { ModalClass, openModal } from "../generals/Modals.jsx";
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
                {key.name} : {key.type} <button>delete</button>
              </div>)
            })}
            <button>add new one </button>
          </div>
        </div>
        <h3>Danger Zone</h3>
      <div className="Applications">
        <div>
          <h4>Delete this Application</h4>
            <ModalClass
              modalId="deleteApplication"
              textContent={"Are you sure you want to delete " + thisApp.name }
              buttons={ [ { text: "deleteFromUpper", action: ()=> this.props.onDeleteClick(thisApp.id) }]  }  />
            <button onClick={() => openModal("deleteApplication")}>Delete this app </button>
        </div>
      </div>

      </div>
    )
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onLoad: (id) => {
      dispatch(getApplicationData(id))
    },
    onDeleteClick: (id) => {
      ownProps.router.push("/applications")
      dispatch(deleteApplication(id));
    }
  }
}

/**
 * CONSIDER to refactor apps state to ordeder set and invent better algorithm.
 */
function mapStateToProps(state) {

  if((state.get('applications').get('apps'))){
    return { apps: (state.get('applications').get('apps')) }
  } else {
    return {apps: fromJS([{id:100, name:"Loading"}])}
  }
}

export const Application = connect(mapStateToProps, mapDispatchToProps, null, {pure:false})(ApplicationBase);
