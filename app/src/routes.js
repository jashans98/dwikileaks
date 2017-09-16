import React from 'react'
import { Route, IndexRoute } from 'react-router'

// Layouts
import App from './App'
import Home from './layouts/home/Home'
import Dashboard from './layouts/dashboard/Dashboard'
import SignUp from './user/layouts/signup/SignUp'
import Profile from './user/layouts/profile/Profile'

import Submit from './submit/SubmitContainer.js'

import { UserIsAuthenticated, UserIsNotAuthenticated } from './util/wrappers.js'

const configureRoutes = () =>
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="dashboard" component={UserIsAuthenticated(Dashboard)} />
    <Route path="submit" component={Submit} />
    <Route path="signup" component={UserIsNotAuthenticated(SignUp)} />
    <Route path="profile" component={UserIsAuthenticated(Profile)} />
  </Route>

export default configureRoutes
