import { put, takeLatest } from 'redux-saga/effects'

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
    yield put({ type: GET_LEAKS__SUCCESS })
  } catch (err) {
    // Dispatch arbitrary on-error action
    yield put({ type: GET_LEAKS__ERROR, payload: err.message })
    console.error('error fetching terms json', err)
  }
}

export default function* getLeaks() {
  yield takeLatest(GET_LEAKS, _getLeaks)
}
