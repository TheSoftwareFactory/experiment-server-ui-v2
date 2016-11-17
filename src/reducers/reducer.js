import { Map,fromJS } from 'immutable';
//TODO Update state so that Applications are behind user.
//TODO since this is allready application Reducer, we should remove silly apps map
// use rather just List of Maps as state.
// since in redux state this is behind applications.

//Do this after backend change

/**
 * Some helper functions.
 */
function findIndexById (state, id ){
  return state.get('apps').findIndex(map =>{ return map.get("id") === id; });
}
/**
 * Creates New State from given state.
 */
function setState(state, newState) {
  return state.merge(newState);
}
/**
 * Returns new State with modified apps List.
 * Where entry is added to apps List.
 *   Return:
 *     new State =  Immutable.Map() {
 *      apps: Immutable.List() <-- new entry added here
 *     }
 */

function addApplication(state, entry){
  //TODO check if value allready in List if is.
  return state.set('apps', state.get('apps').push(Map(entry)));
}

/**
 * Remove given application from state with application Id.
 * You totally could do this with oneliner also.
 */
function removeApplication(state,removeId){

  let index = findIndexById(state,removeId)
  return state.set(
        'apps'
        ,state.get('apps').delete(index)
      );
}
/**
 * Checks if this is first app to put in state or
 * if we are only updating data.
 */
 function setApplicationData(state, data){
   let immutableData = fromJS(data);
   if (state.isEmpty()) {
       return setState(state,{apps: [immutableData]})
   }
   let index = findIndexById(state,immutableData.get('id'));
   if(index !== -1){
     state = state.set('apps',state.get('apps').delete(index));
   }
   return addApplication(state, immutableData);
 }

/**
 * Reducer to listen state modifing action creators.
 */
export default function(state = Map(), action) {
  switch (action.type) {
    case 'SET_STATE':
      return setState(state, action.state);
    case 'ADD_APPLICATION':
       return addApplication(state, action.app);
    case 'REMOVE_APPLICATION':
      return removeApplication(state, action.id);
    case 'SET_APPLICATION_DATA':
      return setApplicationData(state, action.data);
    }
  return state;

}
