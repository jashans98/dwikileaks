import { put, takeLatest, call } from 'redux-saga/effects'
import 'whatwg-fetch';

import {
  GET_LEAKS,
  GET_LEAKS__SUCCESS,
  GET_LEAKS__ERROR,
} from './AdminConstants.js'


const parseJSON = res => res.json()

const checkStatus = res => {
  if (res.status >= 200 && res.status < 300) return res
  const error = new Error(res.statusText);
  error.res = res;

  throw error;
}

const requestJSON = (url, options) => fetch(url, options)
  .then(checkStatus)
  .then(parseJSON)
  .then((data) => ({ data }))
  .catch((err) => {
    throw new Error(err)
  });


/**
 * Saga to get the latest leaks
 */
function* _getLeaks() {
  try {
    const json = yield call(
      requestJSON,
      '../build/contracts/Leak.json'
    )
    yield put({ type: GET_LEAKS__SUCCESS, data: json })
  } catch (err) {
    // Dispatch arbitrary on-error action
    yield put({ type: GET_LEAKS__ERROR, payload: err.message })
    console.error('error fetching terms json', err)
  }
}

export default function* getLeaks() {
  yield takeLatest(GET_LEAKS, _getLeaks)
}
