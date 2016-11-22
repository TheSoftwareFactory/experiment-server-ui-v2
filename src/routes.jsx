import React from 'react'
import { Route, IndexRoute } from 'react-router';

import Users from './components/Users.jsx'
import { Applications } from './components/Applications/Applications.jsx'
import { Application } from './components/Applications/Application.jsx'
import App from './components/App.jsx'
import { Experiment } from './components/Applications/experiments/Experiment.jsx'

/**
 * Front-end routes are listed here. Base component App.
 */

export default () =>{
  return(
    <Route path="/" component={ App }>
      <IndexRoute component={ Applications }/>
      <Route path="applications"  component={ Applications } />
      <Route path="applications/:id" component={ Application } />
      <Route path="applications/:id/experiments" component={ Experiment }/>
      <Route path="/users" component={ Users } />
   </Route>
  )
}
