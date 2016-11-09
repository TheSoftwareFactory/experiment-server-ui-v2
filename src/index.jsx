import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {Router, hashHistory} from 'react-router';
import {createStore, applyMiddleware} from 'redux';
import reducer from './reducer.js';
import routes from './routes.jsx';
import {getApplications} from './action_creators.js';
import createSagaMiddleware from 'redux-saga';
import {rootSaga} from './sagas.js';


const sagaMiddleware = createSagaMiddleware();
const store = createStore( reducer, applyMiddleware(sagaMiddleware));

// then run the saga
sagaMiddleware.run(rootSaga);



//const store = createStore(reducer,applyMiddleware(sagaMiddleware));
store.dispatch(getApplications());

/**
 * Initial renders provides Redux-Provider and React-Router to whole project.
   Please refer router for actual routes and components.
 */
ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory}>{routes}</Router>
  </Provider>,
  document.getElementById('app')
);
