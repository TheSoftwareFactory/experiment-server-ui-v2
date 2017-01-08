import Immutable from 'immutable'

/**
 * Reducers for experiments, only contains initial set ATM.
 */

function setExperiments(state,data){
  return state.merge(data)
}

//TODO test

export default function(state = Immutable.List(), action) {
  switch (action.type) {
    case 'SET_EXPERIMENTS':
      return setExperiments(state, action.data);
    }
  return state;

}
