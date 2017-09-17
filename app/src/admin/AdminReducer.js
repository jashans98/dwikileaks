import { fromJS } from 'immutable'
import {
  GET_LEAKS,
  GET_LEAKS__SUCCESS,
  GET_LEAKS__ERROR,
  DOWNLOAD_DOCUMENT,
} from './AdminConstants'

import {
  retrieveFileToIPFS,
} from '../../../app/ipfslogic/retrieve'

const initialState = fromJS({
  getLeakPending: false,
  getLeakFail: false,
  getLeakSuccess: false,
  data: [],
})

export default function admin(state = initialState, action) {
  switch (action.type) {
    case GET_LEAKS:
      return state
        .set('getLeakPending', true)
        .set('getLeakFail', false)
        .set('getLeakSuccess', false)

    case GET_LEAKS__SUCCESS:
      return state
        .set('getLeakPending', false)
        // TODO: add real property, rather than .data
        .set('data', action.data)
        .set('getLeakFail', false)
        .set('getLeakSuccess', true)

    case GET_LEAKS__ERROR:
      return state
        .set('getLeakPending', false)
        .set('getLeakFail', true)
        .set('getLeakSuccess', false)

    case DOWNLOAD_DOCUMENT: {
      retrieveFileToIPFS(action.hash)

      return state
    }


    default: return state
  }
}
