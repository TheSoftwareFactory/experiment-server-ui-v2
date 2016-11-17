/*
* There are two kind of action_creators here.
* Ones that are passed to Redux-Saga to do async stuff.
* And ones that actually modify state.
* Redux-Saga calls the latter allways after doing async calls
* Please refer sagas.js
*
* Plese note; there MIGHT be a smarter way to handle this but this is clean enough for me
* - With love tixtixti.
*/

//////////////////////////////////////////////

/*
* These are actual ASYNC action calls from UI components
* These are passed to sagas.
*/
export function getApplications() {
  return {
    type: 'GET_APPLICATIONS'
  };
}

export function postApplication(name) {
  return {
    type: 'POST_APPLICATION',
    name
  };
}
export function deleteApplication(id) {
  return {
    type: 'DELETE_APPLICATION',
    id
  };
}
export function getApplicationData(id) {
  return {
    type: 'GET_APPLICATION_DATA',
    id
  };
}
export function deleteConfigKey(data) {
  return {
    type: 'DELETE_CONFIGURATION_KEY',
    data
  };
}
export function postConfigKey(data) {
  return {
    type: 'POST_CONFIGURATION_KEY',
    data
  };
}

/*
* Following are actions creators for reducer to handle state.
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
