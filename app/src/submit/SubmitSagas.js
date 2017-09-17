import { put, takeLatest } from 'redux-saga/effects'
import { delay } from 'redux-saga'

import {
  SUBMIT_FILE,
  SUBMIT_FILE__SUCCESS,
  SUBMIT_FILE__ERROR,
} from './SubmitConstants.js'


import {
  sendFileToIPFS,
} from '../../../app/ipfslogic/submit'

/**
 * Placeholder saga
 * TODO: Hook up with actual submit
 */
function* _submitDocument(documents) {
  try {
    const file = documents.payload[0]
    const reader = new FileReader()

    yield reader.onload = event => {
      const data = reader.result;
      sendFileToIPFS(data)

      return put({ type: SUBMIT_FILE__SUCCESS })
    }

    reader.readAsBinaryString(file)
  } catch (err) {
    // Dispatch arbitrary on-error action
    yield put({ type: SUBMIT_FILE__ERROR, payload: err.message })
    console.error('error fetching terms json', err)
  }
}

export default function* submitDocument() {
  yield takeLatest(SUBMIT_FILE, _submitDocument)
}
