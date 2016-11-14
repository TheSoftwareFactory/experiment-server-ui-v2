import {Map,fromJS} from 'immutable';

//TODO Update state so that Applications are behind user.
//Do this after backend change


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
  //Okey this NOT  the optimal way to do it. Fix if inconvinent.
  let listOfApps = state.get('apps') //get apps List from state
  let indexByRemoveID = listOfApps.findIndex(map =>{ return map.get("id") === removeId; }); //find index by ID
  let splicedList = listOfApps.delete(indexByRemoveID) // crate new list without removed entry.
  return state.set('apps',splicedList); //set it to new state.
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
      return removeApplication(state, action.id)
    }
  return state;

}
