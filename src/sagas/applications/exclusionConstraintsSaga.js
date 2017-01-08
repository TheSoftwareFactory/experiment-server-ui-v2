import { takeEvery, takeLatest } from 'redux-saga'
import { call, put } from 'redux-saga/effects'
import request from 'axios'

import { getApplicationData } from '../../actions/applicationAsycAC.js'


const BASE_URL = 'http://experiment-server2016.herokuapp.com/applications/'

export function* postExclCons(action){
  try{
    yield call(request.post, (BASE_URL + action.data.appId  + "/exclusionconstraints" ),action.data.payload);
    yield put(getApplicationData(action.data.appId))
  } catch(e){
    console.log(e);
  }
}
export function* deleteExclCons(action){
  try{
    yield call(request.delete, (BASE_URL + action.payload.appId + "/exclusionconstraints/" + action.payload.exclId ));
    yield put(getApplicationData(action.payload.appId))
  } catch(e){
    console.log(e);
  }
}

export function* postExclConsSaga(){
  yield* takeEvery("POST_EXCL_CONST", postExclCons);
}
export function* deleteExclConsSaga(){
  yield* takeEvery("DELETE_EXCL_CONST", deleteExclCons);
}
