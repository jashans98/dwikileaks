import { browserHistory } from 'react-router'
import { createStore, applyMiddleware, compose } from 'redux'
import { routerMiddleware } from 'react-router-redux'

import rootSaga from './sagas.js'

import createSagaMiddleware from 'redux-saga';
import reducer from './reducer'

// Redux DevTools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// instantiate the middleware
const sagaMiddleware = createSagaMiddleware();
const routingMiddleware = routerMiddleware(browserHistory)

const store = createStore(
  reducer,
  composeEnhancers(
    applyMiddleware(
      routingMiddleware,
      sagaMiddleware
    )
  )
)

store.runSaga = sagaMiddleware.run(rootSaga)
store.asyncReducers = {}


export default store
