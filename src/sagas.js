import { takeEvery, takeLatest } from 'redux-saga'
import { call, put } from 'redux-saga/effects'
import * as ac from './action_creators.js'
import request from 'axios'
const BASE_URL = 'http://experiment-server2016.herokuapp.com/'

/**
 * Function to get all Applications from backend, uses Redux-Saga middleware
 * to make calls allmost syncronius. Also easy to test.
 *
 * What it actually does it wraps GET request to promise and after it has resolved
 * calls setState Action Creator.
 */
function* getApps() {
  const data = yield call(request.get, (BASE_URL + 'applications') );
  yield put(ac.setState( {apps: data.data} ));
}

/**
 * Function to Post new Application to DB.
 * Uses data.data since axios return object is full of everything.
 * And we only want actual return payload. 
 */
function* postApp(action){
  const data = yield call( request.post, (BASE_URL + 'applications'), { name: action.name } );
  yield put( ac.addApplication(data.data) );
}


function* deleteApp(action){
  const data = yield call( request.delete, (BASE_URL + 'applications/' + action.id),  );
  yield put( ac.removeApplication(action.id) );
}
/**
 * Since you have to tell saga how you want your actions handled
 * there needs to some listerner methods.
 * takeEvery means saga creates buffer and listens every one incoming actions
 * and handles them one by one.
 */
function* getSaga(){
    yield* takeEvery("GET_APPLICATIONS", getApps);
}

function* postSaga(){
      yield* takeEvery("POST_APPLICATION", postApp)
}
function* deleteApplicationSaga(){
      yield* takeEvery("DELETE_APPLICATION", deleteApp)
}

/**
 * And rootSaga to implement all Sagas to store.
 */

export function* rootSaga() {
    yield[getSaga(),postSaga(),deleteApplicationSaga()]

}
