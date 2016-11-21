import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fromJS } from 'immutable';
import { getApplicationData } from '../../actions/action_creators';

/**
 * Components for this class.
 */
import { SubHeader } from '../generals/Generals.jsx';
import Overview from './applicationComponents/Overview.jsx';
import { ConfigurationKeysContainer } from './applicationComponents/ConfigurationKeys.jsx';
import { RangeConstraintsContainer }  from './applicationComponents/RangeConstraints.jsx';
import { DangerZoneContainer } from './applicationComponents/DangerZone.jsx';

export class ApplicationBase extends Component {

  componentWillMount() {
    this.props.onLoad();
  }

  render() {
    if( !(this.props.app.configurationkeys) || (!(this.props.operations)) ) return (<SubHeader heading={"...loading"} />)//indicates we have not yet loaded app details

    return(
      <div>
        <SubHeader heading={this.props.app.name} />
        <Overview {...this.props} />
        <ConfigurationKeysContainer {...this.props} />
        <RangeConstraintsContainer {...this.props} />
        <DangerZoneContainer {...this.props}/>
    </div>
    )
  }
}

//maybe move relevant mapping to correspongid component.

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onLoad: () => {
      dispatch(getApplicationData(ownProps.params.id))
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
