import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import submitReducer from './submit/SubmitReducer.js'
import userReducer from './user/userReducer'
import web3Reducer from './util/web3/web3Reducer'
import AdminReducer from './admin/AdminReducer'

const reducer = combineReducers({
  routing: routerReducer,
  user: userReducer,
  web3: web3Reducer,
  submit: submitReducer,
  admin: AdminReducer,
})

export default reducer
