import { takeEvery, takeLatest } from 'redux-saga'
import { call, put } from 'redux-saga/effects'
import request from 'axios'

import { getApplicationData } from '../../actions/applicationAsycAC.js'


const BASE_URL = 'http://experiment-server2016.herokuapp.com/applications/'

export function* postExclCons(action){
  try{
    yield call(request.post, (BASE_URL + action.payload.id  + "/exclusionconstraints" ),action.payload);
    put(getApplicationData(action.payload.id))
  }
}
export function* deleteExclCons(action){
  try{
    yield call(request.delete, (BASE_URL + action.appId + "/exclusionconstraints/" + action.exclId ));
    put(getApplicationData(action.payload.id))
  }
}


export function* postExclConsSaga(){
  yield* takeEvery("POST_EXCL_CONST", postExclCons);
}
