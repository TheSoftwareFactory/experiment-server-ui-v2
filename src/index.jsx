import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router';

import { rootSaga } from './sagas/sagas.js';
import getRoutes from './routes.jsx'
import { sagaMiddleware, store, history } from './helpers/initHelper.js'

//start Sagas.
sagaMiddleware.run(rootSaga);

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
