import { call, put, take } from 'redux-saga/effects'
import request from 'axios'
import {assert} from 'chai'

import * as saga from '../../src/sagas.js'
import * as ac from '../../src/action_creators.js'
const BASE_URL = 'http://experiment-server2016.herokuapp.com/'
/**
 * TODO Maybe add more errortests and separate logic to other files
 * like saga_application_spec.js
 */

 /**
  * These are tests for Sagas.
  * Since Sagas are actually generator functions in each test we create
  * a generator and simply call 'next' value of it asserting it deeply with that
  * saga's current 'state'.
  */

describe('Saga', () => {
  it('works when the getApps request', () => {
    const generator = saga.getApps();
    assert.deepEqual(
      generator.next().value,
      call(request.get, (BASE_URL + 'applications'))
    )
    const apps = [{id:1, name: "testiAppi"},{id:2, name: "2testiAppi2"}]
    assert.deepEqual(
      generator.next({"data" : apps}).value,
      put(ac.setState({"apps": apps}))
    )
  })
  it('fails and catches error when the getApps fails', () => {
    const generator = saga.getApps();
      assert.deepEqual(
        generator.next().value,
        call(request.get, (BASE_URL + 'applications'))
      );
    const apps = [{id:1, name: "testiAppi"},{id:2, name: "2testiAppi2"}];
    assert.deepEqual(
      generator.next().value,
      put(ac.setState({"apps": []}))
    );
  })
  it('works when posting', () => {
    const action = {name: "testiAppi"};
    const generator = saga.postApp(action);
      assert.deepEqual(
        generator.next().value,
        call(request.post, (BASE_URL + 'applications'),{ name: action.name })
      );
      const idAndName = {id:1, name: "testiAppi"};
      assert.deepEqual(
        generator.next({"data" : idAndName}).value,
        put(ac.addApplication(idAndName))
      );
  })
  it('works when the deleteRequest happens', () => {
    const action = {id: 2};
    const generator = saga.deleteApp(action);
    assert.deepEqual(
      generator.next().value,
      call(request.delete, (BASE_URL + 'applications/' + action.id))
    );
    assert.deepEqual(
      generator.next().value,
      put(ac.removeApplication(action.id))
    );
  })
  it('works when getting Data for app ', () => {
    const action = {id: 2}
    const generator = saga.getAppData(action);
    assert.deepEqual(
      generator.next().value,
      call(request.get, (BASE_URL + 'applications/' + action.id + '/data') )
    )
    const appData = {id: 24, rangeconstraints: [], configurationkeys: [], name: "UusiJuttu"}
    assert.deepEqual(
      generator.next({"data" : appData}).value,
      put(ac.setApplicationData(appData))
    )
  })
});
