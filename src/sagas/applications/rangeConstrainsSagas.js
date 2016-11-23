import { takeEvery, takeLatest } from 'redux-saga'
import { call, put } from 'redux-saga/effects'
import request from 'axios'

import { getApplicationData } from '../../actions/applicationAsycAC.js'

const BASE_URL = 'http://experiment-server2016.herokuapp.com/applications/'


export function* postRangeKey(action){
  try{
    yield call(request.post, (BASE_URL + action.payload.appId+
    "/configurationkeys/" + action.payload.constkey + "/rangeconstraints"),
     {
       configurationkey_id: action.payload.constkey,
       operator_id: action.payload.operator,
       value: action.payload.value
     });
    yield put(getApplicationData(action.payload.appId))
  } catch(e){
    console.log(e);
  }
}
export function* deleteRangeKey(action){
  try{
    yield call(request.delete, (BASE_URL + action.payload.appId+
    "/configurationkeys/" + action.payload.constkey + "/rangeconstraints/" + action.payload.rangeKey))
    yield put(getApplicationData(action.payload.appId))
  } catch(e){
    console.log(e);
  }
}

export function* postRangeKeySaga(){
  yield* takeEvery("POST_RANGE", postRangeKey)
}
export function* deleteRangeKeySaga(){
  yield* takeEvery("DELETE_RANGE", deleteRangeKey)
}
