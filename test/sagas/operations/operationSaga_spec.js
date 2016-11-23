import { call, put, take } from 'redux-saga/effects'
import request from 'axios'
import { assert } from 'chai'

import * as saga from '../../../src/sagas/operations/operatorSaga.js'
import * as ac from '../../../src/actions/operationAC.js'
const BASE_URL = 'http://experiment-server2016.herokuapp.com/operators'

describe('operators', ()=>{
  it("Should get operators", ()=>{
    const generator = saga.getOperations();
    assert.deepEqual(
      generator.next().value,
      call(request.get, (BASE_URL))
    )
    const ops = [{id: 1, human_value:"equals", math_value:"="}];
    assert.deepEqual(
      generator.next({'data': ops}).value,
      put(ac.setOperators(ops))
    )
  });
});
