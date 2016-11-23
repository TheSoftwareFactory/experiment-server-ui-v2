import { takeEvery, takeLatest } from 'redux-saga'
import { call, put } from 'redux-saga/effects'
import request from 'axios'

import { getApplicationData } from '../../actions/applicationAsycAC.js'


const BASE_URL = 'http://experiment-server2016.herokuapp.com/applications/'
/**
 * configurationkeys
 */
export function* delConfig(action){
  try{
    yield call( request.delete, (BASE_URL + action.data.appId + '/configurationkeys/' + action.data.keyId ),  );
    yield put(getApplicationData(action.data.appId) );
  } catch(err){
    console.log(err);
  }
}
export function* addConfig(action){
  try{
    yield call( request.post, (BASE_URL + action.data.appId + '/configurationkeys'),
              { name: action.data.payload.name, type: action.data.payload.type, application_id:action.data.appId }  );
    yield put( getApplicationData(action.data.appId) ); //TODO check actual return and maybe use that.
  } catch(err){
    console.log(err);
  }
}
//TODO test
export function* delAllConfig(action){
  try{
    yield call(request.delete, (BASE_URL + action.id + '/configurationkeys'));
    yield put(getApplicationData(action.id))
  } catch(e){
    console.log(e);
  }
}

export function* deleteAllConfigKeysSaga(){
  yield* takeEvery('DELETE_ALL_CONFIG',delAllConfig)
}
export function* deleteConfigKeySaga(){
     yield* takeEvery("DELETE_CONFIGURATION_KEY", delConfig);
}
export function* postConfigKeySaga(){
   yield* takeEvery("POST_CONFIGURATION_KEY", addConfig)
}
