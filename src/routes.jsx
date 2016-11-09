import React from 'react'
import {Route} from 'react-router';
import Users from './components/Users.jsx'
import {ApplicationAdder} from './components/Applications/CreateApplication.jsx'
import App from './components/App.jsx'

/**
 * Front-end routes are listed here. Base component App.
 */

const routes = (
 <Route component={App}>
  <Route path="/" component={ApplicationAdder} />
  <Route path="/users" component={Users} />
</Route> );

export default routes;
