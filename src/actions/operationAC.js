/**
 * These are Action Creators for Operations state.
 * Both dispatchin data from index to Saga and passing data from Saga
 * to operation Reducer.
 */

export function getOperations() {
  return {
    type: 'GET_OPERATIONS'
  };
}
export function setOperators(operators) {
  return {
    type: 'SET_OPERATORS',
    operators
  };
}
