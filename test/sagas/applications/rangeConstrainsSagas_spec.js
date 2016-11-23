import { call, put, take } from 'redux-saga/effects'
import request from 'axios'
import { assert } from 'chai'

import * as saga from '../../../src/sagas/applications/rangeConstrainsSagas.js'
import { getApplicationData } from '../../../src/actions/applicationAsycAC.js'
const BASE_URL = 'http://experiment-server2016.herokuapp.com/applications/'

describe('RangeConstraints Saga',()=>{
  it("Should post RangeKey", ()=>{

    const action = { payload: {appId: 1, constkey: 12, operator: 2, value: 12} }
    const generator = saga.postRangeKey(action);
    assert.deepEqual(
      generator.next().value,
      call(request.post, (BASE_URL + action.payload.appId+
      "/configurationkeys/" + action.payload.constkey + "/rangeconstraints"),
       {
      configurationkey_id: action.payload.constkey,
       operator_id: action.payload.operator,
       value: action.payload.value})
    )
    assert.deepEqual(
      generator.next().value,
      put(getApplicationData(action.payload.appId))
    )

  });
  it('works deleting rangeKey key ', () => {
    const action = {payload: { appId: 1, constkey : 3, rangeKey:22 } };
    const generator = saga.deleteRangeKey(action);
    assert.deepEqual(
      generator.next().value,
      call(request.delete, (BASE_URL + action.payload.appId+
      "/configurationkeys/" + action.payload.constkey + "/rangeconstraints/" + action.payload.rangeKey))  );
    assert.deepEqual(
      generator.next().value,
      put(getApplicationData(action.payload.appId ))
    )
  });
});
