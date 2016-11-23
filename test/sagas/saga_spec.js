import { call, put, take } from 'redux-saga/effects'
import request from 'axios'
import { assert } from 'chai'

import * as saga from '../../src/sagas/sagas.js'
import * as ac from '../../src/actions/action_creators.js'
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
      put(ac.setState(apps))
    )
  })
  /*
  it('fails and catches error when the getApps fails', () => {
    const generator = saga.getApps();
      assert.deepEqual(
        generator.next().value,
        call(request.get, (BASE_URL + 'applications'))
      );
    const apps = [{id:1, name: "testiAppi"},{id:2, name: "2testiAppi2"}];
    assert.deepEqual(
      generator.next().value,
      put(ac.setState( []))
    );
  })
  */
  it('works when posting an App', () => {
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
  });
  it('works deleting configuration key ', () => {
    const action = {data: { appId: 1, keyId : 3 } };
    const generator = saga.delConfig(action);
    assert.deepEqual(
      generator.next().value,
      call(request.delete, (BASE_URL + 'applications/' + action.data.appId + '/configurationkeys/' + action.data.keyId) )
    );
    assert.deepEqual(
      generator.next().value,
      put(ac.getApplicationData(action.data.appId ))
    )
  });
  it('works adding configuration key ', () => {
    const action = { data: { appId: 1, keyId : 3, payload: {name: "uusiAteena", type:"boolean"} } };
    const generator = saga.addConfig(action);
    assert.deepEqual(
      generator.next().value,
      call(request.post, (BASE_URL + 'applications/' + action.data.appId + '/configurationkeys'),
                        {application_id: action.data.appId, name: action.data.payload.name, type: action.data.payload.type})
    );
      assert.deepEqual(
      generator.next().value,
      put(ac.getApplicationData(action.data.appId ))
    )
  });
  it("Should post RangeKey", ()=>{

    const action = { payload: {appId: 1, constkey: 12, operator: 2, value: 12} }
    const generator = saga.postRangeKey(action);
    assert.deepEqual(
      generator.next().value,
      call(request.post, (BASE_URL + "applications/"+ action.payload.appId+
      "/configurationkeys/" + action.payload.constkey + "/rangeconstraints"),
       {
      configurationkey_id: action.payload.constkey,
       operator_id: action.payload.operator,
       value: action.payload.value})
    )
    assert.deepEqual(
      generator.next().value,
      put(ac.getApplicationData(action.payload.appId))
    )

  });
  it('works deleting rangeKey key ', () => {
    const action = {payload: { appId: 1, constkey : 3, rangeKey:22 } };
    const generator = saga.deleteRangeKey(action);
    assert.deepEqual(
      generator.next().value,
      call(request.delete, (BASE_URL + "applications/"+ action.payload.appId+
      "/configurationkeys/" + action.payload.constkey + "/rangeconstraints/" + action.payload.rangeKey))  );
    assert.deepEqual(
      generator.next().value,
      put(ac.getApplicationData(action.payload.appId ))
    )
  });
  it("Should get operators", ()=>{
    const generator = saga.getOperations();
    assert.deepEqual(
      generator.next().value,
      call(request.get, (BASE_URL + 'operators'))
    )
    const ops = [{id: 1, human_value:"equals", math_value:"="}];
    assert.deepEqual(
      generator.next({'data': ops}).value,
      put(ac.setOperators(ops))
    )

  })
});
