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
