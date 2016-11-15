import reducer from '../../src/reducers/reducer.js';
import { fromJS } from 'immutable'
import { expect } from 'chai';
describe('Reducer', () => {
  it('should add application to state', () => {
    const state = fromJS(
      {
        apps: [{id:1, name: "testiAppi"},{id:2, name: "2testiAppi2"}]
      }
    );
    const action = {type: 'ADD_APPLICATION', app: {id:3, name: "3testiIAppi3"}};
    const nextState = reducer(state, action);
    expect(nextState).to.equal(fromJS(
      {
        apps : [{id:1, name: "testiAppi"},{id:2, name: "2testiAppi2"},{id:3, name: "3testiIAppi3"}]
      }
    ));
  });
  it('should remove application from state', () => {
    const state = fromJS(
      {
        apps: [{id:1, name: "testiAppi"},{id:2, name: "2testiAppi2"},{id:3, name: "3testiIAppi3"}]
      }
    );
    const action = {type: 'REMOVE_APPLICATION', id:3 };
    const nextState = reducer(state, action);
    expect(nextState).to.equal(fromJS(
      {
        apps : [{id:1, name: "testiAppi"},{id:2, name: "2testiAppi2"}]
      }
    ));
  });
  it('should add all aplication to state', () => {
    const state = fromJS({});
    const action = {type: 'SET_STATE',state: {apps : [{id:1, name: "testiAppi"},{id:2, name: "2testiAppi2"}]} };
    const nextState = reducer(state, action);
    expect(nextState).to.equal(fromJS(
      {
        apps : [{id:1, name: "testiAppi"},{id:2, name: "2testiAppi2"}]
      }
    ));
  });
});
