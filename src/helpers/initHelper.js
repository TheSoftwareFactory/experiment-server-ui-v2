import { hashHistory } from 'react-router';
import { combineReducers } from 'redux-immutable';
import { createStore, applyMiddleware } from 'redux';
import reducer from '../reducers/reducer.js';
import routerReducer  from '../reducers/router-reducer.js';
import createSagaMiddleware from 'redux-saga';
import { syncHistoryWithStore } from 'react-router-redux'
import { Map } from 'immutable'

/**
 * Init store, reducers, and history and Saga middleware
 */
const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
    applications: reducer,
    routing: routerReducer
})
const initialState = Map();

const store = createStore(
    rootReducer,
     initialState,
     applyMiddleware(sagaMiddleware)
   );



const history = syncHistoryWithStore(hashHistory, store, {
   selectLocationState (state) {
     return state.get('routing').toJS()
   }
 });

 export{ sagaMiddleware, store, history }
