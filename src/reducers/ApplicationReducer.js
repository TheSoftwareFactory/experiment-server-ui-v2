import { Map,List,fromJS } from 'immutable';

//TODO Update state so that Applications are behind user.
//TODO First implement user and user login of course.

//TODO since this is allready application Reducer, we should remove silly apps map
// use rather just List of Maps as state.
// since in redux state this is behind applications.

//Do this after backend change

/**
 * Some helper functions.
 */
function findIndexById (state, id ){
  return state.findIndex(map =>{ return map.get("id") === id; });
}

/**
 * Creates New State from given state.
 */
function mergeState(state, newState) {
  return state.merge(newState)
}


/**
 * Adds entry to application state.
 */
function addApplication(state, entry){
  //TODO check if value allready in List if is.
  return state.push(Map(entry));


}

/**
 * Remove given application from state with application Id.
 */
function removeApplication(state,removeId){
  let index = findIndexById(state,removeId)
  return state.delete(index);
}
/**
 * Checks if this is first app to put in state or
 * if we are only updating data.
 */
 function setApplicationData(state, data){
   let immutableData = fromJS(data);
   if (state.isEmpty()) {
       return addApplication(state,immutableData);
   }
   let index = findIndexById(state,immutableData.get('id'));
   if(index !== -1){
     state = state.delete(index);
   }
   return addApplication(state, immutableData);
 }

/**
 * Reducer to listen state modifing action creators.
 */
export default function(state = List(), action) {
  switch (action.type) {
    case 'SET_STATE':
      return mergeState(state, action.state);
    case 'ADD_APPLICATION':
       return addApplication(state, action.app);
    case 'REMOVE_APPLICATION':
      return removeApplication(state, action.id);
    case 'SET_APPLICATION_DATA':
      return setApplicationData(state, action.data);
    }
  return state;

}
