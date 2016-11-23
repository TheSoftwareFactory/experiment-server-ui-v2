import { takeEvery, takeLatest } from 'redux-saga'
import { call, put } from 'redux-saga/effects'
import request from 'axios'
import { setOperators } from '../../actions/operationAC.js'

const BASE_URL = 'http://experiment-server2016.herokuapp.com/operators'
/**
 * Operator
 */
export function* getOperations(){
  try {
    const data = yield call(request.get, (BASE_URL))
    yield put(setOperators(data.data))
  } catch (e) {
    console.log(e);
  }
}
export function* getOperationsSaga(){
  yield* takeEvery("GET_OPERATIONS", getOperations)
}
