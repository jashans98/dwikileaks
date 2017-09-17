import React from 'react'
import { Route, IndexRoute } from 'react-router'

// Layouts
import App from './App'
import Home from './layouts/home/Home'

import Submit from './submit/SubmitContainer'
import Admin from './admin/AdminContainer'

const configureRoutes = () =>
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="submit" component={Submit} />
    <Route path="admin" component={Admin} />
  </Route>

export default configureRoutes
