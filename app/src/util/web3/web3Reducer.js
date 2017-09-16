import { fromJS } from 'immutable'
import {
  WEB3_INITIALIZED,
  WEB3_NOEXIST,
} from './web3Constants'

const initialState = fromJS({
  web3Instance: null,
  existenceChecked: false,
})

const web3Reducer = (state = initialState, action) => {
  switch(action.type) {
    case WEB3_INITIALIZED:
      return state
        .set('web3Instance', true)
        .set('existenceChecked', true)

    case WEB3_NOEXIST:
      return state
        .set('web3Instance', null)
        .set('existenceChecked', true)

    default: return state
  }
}

export default web3Reducer
