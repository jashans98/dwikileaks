import React from 'react'
import ReactDOM from 'react-dom'
import { applyRouterMiddleware, Router, browserHistory } from 'react-router'
import { Provider } from 'react-redux'
import { syncHistoryWithStore } from 'react-router-redux'
import getWeb3 from './util/web3/getWeb3'

import configureStore from './store'
import configureRoutes from './routes'

const store = configureStore({}, browserHistory)
const history = syncHistoryWithStore(browserHistory, store, {})
const routes = configureRoutes()

// Initialize web3 and set in Redux.
getWeb3
.then(results => {
  console.log('Web3 initialized!')
})
.catch(() => {
  console.log('Error in web3 initialization.')
})

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
