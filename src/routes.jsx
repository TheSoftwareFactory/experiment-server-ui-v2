import React from 'react'
import {Route} from 'react-router';
import Users from './components/Users.jsx'
import {Applications} from './components/Applications/Applications.jsx'
import App from './components/App.jsx'

/**
 * Front-end routes are listed here. Base component App.
 */

const routes = (
 <Route component={App}>
  <Route path="/" component={Applications} />
  <Route path="/users" component={Users} />
</Route> );

export default routes;
