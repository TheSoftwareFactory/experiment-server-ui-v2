import { call, put, take } from 'redux-saga/effects'
import request from 'axios'
import { assert } from 'chai'

import { getExperiments } from '../../../src/sagas/experiments/experimentSagas.js'
import { setExperiments } from '../../../src/actions/experimentAC.js'
const BASE_URL = 'http://experiment-server2016.herokuapp.com/applications/'

describe('Experiments',()=>{
  it('should get Experiments',()=>{
    const action = {id:12};
    const generator = getExperiments(action);
    assert.deepEqual(generator.next().value,
    call(request.get,(BASE_URL + action.id + "/experiments")))
    const exp = {name: "testi", id: 12};
    assert.deepEqual(generator.next({data: exp}).value,
    put(setExperiments(exp)))
  })
});
