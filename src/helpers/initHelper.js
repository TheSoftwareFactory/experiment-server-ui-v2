import { hashHistory } from 'react-router';
import { combineReducers } from 'redux-immutable';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { syncHistoryWithStore } from 'react-router-redux'
import { Map } from 'immutable';

import experimentReducer from '../reducers/experimentReducer.js';
import ApplicationReducer from '../reducers/ApplicationReducer.js';
import routerReducer  from '../reducers/router-reducer.js';
import operationReducer from '../reducers/operationReducer.js';


/**
 * Init store, reducers, and history and Saga middleware
 */
const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
    applications: ApplicationReducer,
    routing: routerReducer,
    operations: operationReducer,
    experiments: experimentReducer
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

//Then export them to index.js
 export{ sagaMiddleware, store, history }
