import { fromJS } from 'immutable'
import { expect } from 'chai';

import reducer from '../../src/reducers/ApplicationReducer.js';

describe('Reducer', () => {
  it('should add application to state', () => {
    const state = fromJS(
         [{id:1, name: "testiAppi"},{id:2, name: "2testiAppi2"}]
    );
    const action = {type: 'ADD_APPLICATION', app: {id:3, name: "3testiIAppi3"}};
    const nextState = reducer(state, action);
    expect(nextState).to.equal(fromJS(
         [{id:1, name: "testiAppi"},{id:2, name: "2testiAppi2"},{id:3, name: "3testiIAppi3"}]
    ));
  });
  it('should remove application from state', () => {
    const state = fromJS(
      [{id:1, name: "testiAppi"},{id:2, name: "2testiAppi2"},{id:3, name: "3testiIAppi3"}]
    );
    const action = {type: 'REMOVE_APPLICATION', id:3 };
    const nextState = reducer(state, action);
    expect(nextState).to.equal(fromJS(
       [{id:1, name: "testiAppi"},{id:2, name: "2testiAppi2"}]
    ));
  });
  it('should add all aplication to state', () => {
    const state = fromJS([]);
    const action = {type: 'SET_STATE', state:  [ {id:1, name: "testiAppi"},{id:2, name: "2testiAppi2"}] } ;
    const nextState = reducer(state, action);
    expect(nextState).to.equal(fromJS(
      [{id:1, name: "testiAppi"},{id:2, name: "2testiAppi2"}]
    ));
  });
  it('should update single app when state is empty', () => {
    const state = fromJS([]);
    const action =
    {
      type: 'SET_APPLICATION_DATA',
      data: {id: 24, rangeconstraints: [], configurationkeys: [], name: "UusiJuttu"}
    }
    const nextState = reducer(state, action);
    expect(nextState).to.equal(fromJS(
      [{id: 24, rangeconstraints: [], configurationkeys: [], name: "UusiJuttu"}]
    ));
  });
  it('should update single app when state is not empty and is in state', () => {
    const state = fromJS(
        [{id:1, name: "testiAppi"},{id:2, name: "2testiAppi2"},{id:3, name: "UusiJuttu"}]
    );
    const action =
    {
      type: 'SET_APPLICATION_DATA',
      data: {"configurationkeys": [
        {"application_id": 1, "id": 1, "type": "boolean", "name": "highscore"},
        {"application_id": 1, "id": 2, "type": "integer", "name": "difficulty"},
        {"application_id": 1, "id": 3, "type": "double", "name": "speed"}
      ],
        "id": 3,
         "rangeconstraints": [
           {"operator_id": 4, "id": 1, "value": "1", "configurationkey_id": 2}, {"operator_id": 2, "id": 2, "value": "5", "configurationkey_id": 2}, {"operator_id": 5, "id": 3, "value": "0", "configurationkey_id": 3}
         ],
          "name": "UusiJuttu"}
    }
    const nextState = reducer(state, action);
    expect(nextState).to.equal(fromJS(
      [{id:1, name: "testiAppi"},{id:2, name: "2testiAppi2"},{"configurationkeys": [{"application_id": 1, "id": 1, "type": "boolean", "name": "highscore"}, {"application_id": 1, "id": 2, "type": "integer", "name": "difficulty"}, {"application_id": 1, "id": 3, "type": "double", "name": "speed"}], "id": 3, "rangeconstraints": [{"operator_id": 4, "id": 1, "value": "1", "configurationkey_id": 2}, {"operator_id": 2, "id": 2, "value": "5", "configurationkey_id": 2}, {"operator_id": 5, "id": 3, "value": "0", "configurationkey_id": 3}], "name": "UusiJuttu"}
    ]));
  });
  it('should update single app when state is not empty and is NOT in state', () => {
    const state = fromJS(
      [{id:1, name: "testiAppi"},{id:2, name: "2testiAppi2"}]

    );
    const action =
    {
      type: 'SET_APPLICATION_DATA',
      data: {"configurationkeys": [
        {"application_id": 1, "id": 1, "type": "boolean", "name": "highscore"},
        {"application_id": 1, "id": 2, "type": "integer", "name": "difficulty"},
        {"application_id": 1, "id": 3, "type": "double", "name": "speed"}
      ],
        "id": 3,
         "rangeconstraints": [
           {"operator_id": 4, "id": 1, "value": "1", "configurationkey_id": 2}, {"operator_id": 2, "id": 2, "value": "5", "configurationkey_id": 2}, {"operator_id": 5, "id": 3, "value": "0", "configurationkey_id": 3}
         ],
          "name": "UusiJuttu"}
    }
    const nextState = reducer(state, action);
    expect(nextState).to.equal(fromJS(

      [{id:1, name: "testiAppi"},{id:2, name: "2testiAppi2"},{"configurationkeys": [{"application_id": 1, "id": 1, "type": "boolean", "name": "highscore"}, {"application_id": 1, "id": 2, "type": "integer", "name": "difficulty"}, {"application_id": 1, "id": 3, "type": "double", "name": "speed"}], "id": 3, "rangeconstraints": [{"operator_id": 4, "id": 1, "value": "1", "configurationkey_id": 2}, {"operator_id": 2, "id": 2, "value": "5", "configurationkey_id": 2}, {"operator_id": 5, "id": 3, "value": "0", "configurationkey_id": 3}], "name": "UusiJuttu"}
      ]

    ));
  });
});
