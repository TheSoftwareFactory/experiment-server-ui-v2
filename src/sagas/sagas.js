import { takeEvery, takeLatest } from 'redux-saga'
import { call, put } from 'redux-saga/effects'
import request from 'axios'
import {fromJS} from 'immutable'

import * as ac from '../actions/action_creators.js'

const BASE_URL = 'http://experiment-server2016.herokuapp.com/'

/**
 * Function to get all Applications from backend, uses Redux-Saga middleware
 * to make calls allmost syncronius. Also very easy to test.
 * Please use export syntax before function* call to pass function* to tests.
 *
 * What it actually does it wraps GET request to promise and after it has resolved
 * calls setState Action Creator.
 */
export function* getApps() {
  try {
    const data = yield call(request.get, (BASE_URL + 'applications') );
    yield put(ac.setState( {apps: data.data} ));
  } catch (err) {
    yield put(ac.setState({ apps:[]}));
  }

}

/**
 * Function to Post new Application to DB.
 * Uses data.data since axios return object is full of everything.
 * And we only want actual return payload.
 */
export function* postApp(action){
  try {
    const data = yield call( request.post, (BASE_URL + 'applications'), { name: action.name } );
    yield put( ac.addApplication(data.data) );
  } catch (err) {
    console.log(err);
    yield put(ac.erroScreen(err))
  }
}

/**
 *  Gets id from action and calls backend to delete given
 */

export function* deleteApp(action){
  try{
    const data = yield call( request.delete, (BASE_URL + 'applications/' + action.id),  );
    yield put( ac.removeApplication(action.id) );
  } catch(err){
    console.log(err);
  }
}

export function* getAppData(action){
  try{
    const data = yield call(request.get, (BASE_URL + 'applications/' + action.id + '/data') );
    yield put( ac.setApplicationData(data.data) )
  } catch(err){
    console.log(err)
  }
}
/**
 * Since you have to tell saga how you want your actions handled
 * there needs to some listerner methods.
 * takeEvery means saga creates buffer and listens every one incoming actions
 * and handles them one by one.
 */
function* getApplicationsSaga(){
    yield* takeEvery("GET_APPLICATIONS", getApps);
}

function* postSaga(){
      yield* takeEvery("POST_APPLICATION", postApp)
}
function* deleteApplicationSaga(){
      yield* takeEvery("DELETE_APPLICATION", deleteApp)
}
function* getApplicationDataSaga(){
  yield* takeEvery("GET_APPLICATION_DATA", getAppData)
}

/**
 * And rootSaga to implement all Sagas to store.
 */

export function* rootSaga() {
    yield[getApplicationDataSaga(),getApplicationsSaga(),postSaga(),deleteApplicationSaga()]

}
