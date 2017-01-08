import Immutable from 'immutable'

/**
 * Reducers for experiments, only contains initial set ATM.
 * TBH we probably will not need anymore. 
 */
function setOperators(state,data){
  return state.merge(data)
}

export default function(state = Immutable.List(), action) {
  switch (action.type) {
    case 'SET_OPERATORS':
      return setOperators(state, action.operators);
    }
  return state;

}
