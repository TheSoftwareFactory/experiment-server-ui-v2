/**
 * These action Creators are for passing data from Sagas to Application Reducer. 
 */

export function addApplication(app) {
  return {
    type: 'ADD_APPLICATION',
    app
  };
}
export function setState(state) {
  return {
    type: 'SET_STATE',
    state
  };
}
export function removeApplication(id) {
  return {
    type: 'REMOVE_APPLICATION',
    id
  };
}
export function setApplicationData(data) {
  return {
    type: 'SET_APPLICATION_DATA',
    data
  };
}
export function setOperators(operators) {
  return {
    type: 'SET_OPERATORS',
    operators
  };
}
