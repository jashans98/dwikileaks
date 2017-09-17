import { put, takeLatest, call } from 'redux-saga/effects'
import 'whatwg-fetch';
import TruffleContract from 'truffle-contract'
import LeakContract from '../../build/contracts/Leak.json'

import {
  GET_LEAKS,
  GET_LEAKS__SUCCESS,
  GET_LEAKS__ERROR,
} from './AdminConstants.js'

/**
 * Saga to get the latest leaks
 */
function* _getLeaks() {
  try {
    yield call(() => window.LeakApp.fetchSubmissions(() => {}))

   yield put({ type: GET_LEAKS__SUCCESS, data: window.LeakApp.data })
  } catch (err) {
    // Dispatch arbitrary on-error action
    yield put({ type: GET_LEAKS__ERROR, payload: err.message })
    console.error('error fetching terms json', err)
  }
}

export default function* getLeaks() {
  yield takeLatest(GET_LEAKS, _getLeaks)
}