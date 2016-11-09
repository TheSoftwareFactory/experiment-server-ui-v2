import {connect} from 'react-redux';
import {postApplication,deleteApplication} from '../../action_creators.js'
import ApplicationHOC from './ApplicationHOC.jsx'


const mapDispatchToProps = (dispatch) => {
  return {
    onClick: (name) => {
      dispatch(postApplication(name))
    },
    onDeleteClick: (id) => {
      dispatch(deleteApplication(id))
    }
  }
}

function mapStateToProps(state) {
    return { apps: (state.get('apps') ? state.get('apps')  : [] )}
}

export const ApplicationAdder = connect(mapStateToProps, mapDispatchToProps)(ApplicationHOC);
