import { takeEvery, takeLatest } from 'redux-saga'
import { call, put } from 'redux-saga/effects'
import request from 'axios'

//import { getExperimentsSaga } from './experimentSagas.js'
import * as ac from '../../actions/applicationReducerAC.js'

const BASE_URL = 'http://experiment-server2016.herokuapp.com/'
const BASE_URL_APP = BASE_URL + "applications"
const BASE_URL_APP_P = BASE_URL_APP + "/"

/**
 * TODO many of sagas simply call to getApplicationData after their job is done
 * maybe it would be faster to recreate state in reducers.
 * This causes one extra API call everytime, but helps us from a lot of work creating
 * and updating state.
 * "Po-ta-to, Po-tah-to".
 */

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
    const data = yield call(request.get, (BASE_URL_APP) );
    yield put(ac.setState( data.data ));
  } catch (err) {
    put(ac.setState( [] ));
  }
}

export function* postApp(action){
  try {
    const data = yield call( request.post, (BASE_URL_APP), { name: action.name } );
    yield put( ac.addApplication(data.data) );
  } catch (err) {
    console.log(err);
    yield put(ac.errorScreen(err))
  }
}

export function* deleteApp(action){
  try{
    yield call( request.delete, (BASE_URL_APP_P + action.id),  );
    yield put( ac.removeApplication(action.id) );
  } catch(err){
    console.log(err);
  }
}

export function* getAppData(action){
  try{
    const data = yield call(request.get, (BASE_URL_APP_P  + action.id + '/data') );
    yield put( ac.setApplicationData(data.data) )
  } catch(err){
    console.log(err)
  }
}

export function* getApplicationsSaga(){
    yield* takeEvery("GET_APPLICATIONS", getApps);
}
export function* getApplicationDataSaga(){
  yield* takeEvery("GET_APPLICATION_DATA", getAppData)
}
export function* postApplicationSaga(){
      yield* takeEvery("POST_APPLICATION", postApp)
}
export function* deleteApplicationSaga(){
      yield* takeEvery("DELETE_APPLICATION", deleteApp)
}
