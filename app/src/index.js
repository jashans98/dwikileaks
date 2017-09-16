import React from 'react'
import ReactDOM from 'react-dom'
import { applyRouterMiddleware, Router, browserHistory } from 'react-router'
import { Provider } from 'react-redux'
import { syncHistoryWithStore } from 'react-router-redux'

import configureStore from './store'
import configureRoutes from './routes'

const store = configureStore({}, browserHistory)
const history = syncHistoryWithStore(browserHistory, store, {})
const routes = configureRoutes()

ReactDOM.render((
    <Provider store={store}>
      <Router
        history={history}
        render={applyRouterMiddleware()}
        routes={routes}
      />
    </Provider>
  ),
  document.getElementById('root')
)
