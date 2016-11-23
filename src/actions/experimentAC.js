/**
 * These are Action Creators for Experiments state.
 * Both dispatchin data from components to Sagas and passing data from Sagas
 * to experiment Reducer.
 */
 
export function getExperiments(id) {
  return {
    type: 'GET_EXPERIMENTS',
    id
  }
}
export function setExperiments(data) {
  return {
    type: 'SET_EXPERIMENTS',
    data
  };
}
