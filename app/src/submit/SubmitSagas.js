import { put, takeLatest } from 'redux-saga/effects'

import {
  SUBMIT_FILE,
  SUBMIT_FILE__SUCCESS,
  SUBMIT_FILE__ERROR,
} from './SubmitConstants.js'

/**
 * Placeholder saga
 * TODO: Hook up with actual submit
 */
function* _submitDocument(documents) {
  try {
    yield put({ type: SUBMIT_FILE__SUCCESS })
  } catch (err) {
    // Dispatch arbitrary on-error action
    yield put({ type: SUBMIT_FILE__ERROR, payload: err.message })
    console.error('error fetching terms json', err)
  }
}

export default function* submitDocument() {
  yield takeLatest(SUBMIT_FILE, _submitDocument)
}
