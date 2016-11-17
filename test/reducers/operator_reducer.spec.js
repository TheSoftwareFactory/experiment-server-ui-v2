import { fromJS } from 'immutable'
import { expect } from 'chai';

import operationReducer from '../../src/reducers/operationReducer.js';

describe('Operation Reducer', () => {
  it('should add operations to state', () => {
    const state = fromJS([]);

    const action = {type: 'SET_OPERATORS', operators: [
      {id: 1, human_value:"equals", math_value:"="},
      {id: 2, human_value:"less than", math_value:"<"}
    ]};
    const nextState = operationReducer(state, action);
    expect(nextState).to.equal(fromJS(
        [
          {id: 1, human_value:"equals", math_value:"="},
          {id: 2, human_value:"less than", math_value:"<"}
        ]

    ));
  })
});
