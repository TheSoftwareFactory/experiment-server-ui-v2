import Immutable from 'immutable'

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
