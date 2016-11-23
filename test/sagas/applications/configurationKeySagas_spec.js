import { call, put, take } from 'redux-saga/effects'
import request from 'axios'
import { assert } from 'chai'

import * as saga from '../../../src/sagas/applications/configurationKeysSagas.js'
import { getApplicationData } from  '../../../src/actions/applicationAsycAC.js'
const BASE_URL = 'http://experiment-server2016.herokuapp.com/applications/'


describe('ConfigurationKeys Saga', () => {
  it('works deleting configuration key ', () => {
    const action = {data: { appId: 1, keyId : 3 } };
    const generator = saga.delConfig(action);
    assert.deepEqual(
      generator.next().value,
      call(request.delete, (BASE_URL + action.data.appId + '/configurationkeys/' + action.data.keyId) ));
    assert.deepEqual(
      generator.next().value,
      put(getApplicationData(action.data.appId ))
    )
  });
  it('works adding configuration key ', () => {
    const action = { data: { appId: 1, keyId : 3, payload: {name: "uusiAteena", type:"boolean"} } };
    const generator = saga.addConfig(action);
    assert.deepEqual(
      generator.next().value,
      call(request.post, (BASE_URL + action.data.appId + '/configurationkeys'),
                        {application_id: action.data.appId, name: action.data.payload.name, type: action.data.payload.type})
    );
      assert.deepEqual(
      generator.next().value,
      put(getApplicationData(action.data.appId ))
    )
  });
  it('works deleting all configurationKeys ', () => {
    const action = { id: 12 };
    const generator = saga.delAllConfig(action);
    assert.deepEqual(
      generator.next().value,
      call(request.delete, (BASE_URL + action.id + '/configurationkeys')));
      assert.deepEqual(
      generator.next().value,
      put(getApplicationData(action.id ))
    )
  });
});
