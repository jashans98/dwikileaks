import { createStore, applyMiddleware, compose } from 'redux'
import { routerMiddleware } from 'react-router-redux'

import rootSaga from './sagas.js'

import createSagaMiddleware from 'redux-saga'
import reducer from './reducer'



export default function configureStore(initialState = {}, history) {
  // Redux DevTools
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

  // instantiate the middleware
  const sagaMiddleware = createSagaMiddleware()
  const routingMiddleware = routerMiddleware(history)

  const middleware = [
    sagaMiddleware,
    routingMiddleware,
  ]

  const store = createStore(
    reducer,
    composeEnhancers(
      applyMiddleware(...middleware)
    )
  )

  store.runSaga = sagaMiddleware.run(rootSaga)

  return store
}
