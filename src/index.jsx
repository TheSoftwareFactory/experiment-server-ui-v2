import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import { getOperationsSaga } from './sagas/operations/operatorSaga.js';
import { getExperimentsSaga } from './sagas/experiments/experimentSagas.js';
import applicationRootSaga from './sagas/applications/applicationRootSaga.js';
import getRoutes from './routes.jsx'
import { sagaMiddleware, store, history } from './helpers/initHelper.js'

//start Sagas.
sagaMiddleware.run(applicationRootSaga);
sagaMiddleware.run(getExperimentsSaga)
sagaMiddleware.run(getOperationsSaga)

// To load unchangeable data to store.
 store.dispatch({type: 'GET_OPERATIONS'});

/**
 * Initial renders provides Redux-Provider and React-Router to whole project.
 * Please refer router for actual routes and components.
 * To find History and Store see initHelper file.
 */

render(
  <Provider store={store}>
    <Router history={history}>
      {getRoutes()}
    </Router>
  </Provider>,
  document.getElementById('app')
);
