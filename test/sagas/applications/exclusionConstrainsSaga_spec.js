import { call, put, take } from 'redux-saga/effects'
import request from 'axios'
import { assert } from 'chai'

import * as saga from '../../../src/sagas/applications/exclusionConstraintsSaga.js'
import { getApplicationData } from  '../../../src/actions/applicationAsycAC.js'
const BASE_URL = 'http://experiment-server2016.herokuapp.com/applications/'

describe('Exclusion Constrains Saga',()=>{
  it('should work on delete',()=>{
    const action = { payload: {appId: 12, ckId: 11, exclId:11}};
    const generator = saga.deleteExclCons(action);
    assert.deepEqual(generator.next().value,
    call(request.delete, (BASE_URL + action.payload.appId + "/exclusionconstraints/" + action.payload.exclId )));
    assert.deepEqual(generator.next().value,
    put(getApplicationData(action.payload.appId)));
  });
  it('should work on post',()=>{

    const action = { data: {appId: 12,  payload: {ckId: 11, exclId:11} }};
    const generator = saga.postExclCons(action);
    assert.deepEqual(generator.next().value,
    call(request.post, (BASE_URL + action.data.appId  + "/exclusionconstraints" ),action.data.payload),action.data.payload );
    assert.deepEqual(generator.next().value,
    put(getApplicationData(action.data.appId)))

  });
})
