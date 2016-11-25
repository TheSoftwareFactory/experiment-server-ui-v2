/**
 * Application Data
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
/**
 * Config keys
 */
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
export function deleteAllConfigKeys(id){
  return {
    type: 'DELETE_ALL_CONFIG',
    id
  }
}
/**
 * Range Keys
 */
export function postRangeKey(payload){
  return {
    type: 'POST_RANGE',
    payload
  }
}
export function deleteRangeKey(payload){
  return {
    type: 'DELETE_RANGE',
    payload
  }
}
/**
 * ExclusionConstraints
 */
export function postExclConsAction(data){
  return {
    type: 'POST_EXCL_CONST',
    data
  }
}
export function deleteExclConsAction(payload){
  return {
    type: 'DELETE_EXCL_CONST',
    payload
  }
}
