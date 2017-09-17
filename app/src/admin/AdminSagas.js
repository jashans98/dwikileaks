import { put, takeLatest } from 'redux-saga/effects'
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
    // This might not work. might have to mutate DOM directly
    // hacky, hacky, hacky.
    // window.LeakApp.fetchSubmissions(results =>
    //   put({ type: GET_LEAKS__SUCCESS, data: results }))

    // Set the `results` equal to the response from smart contract
    // TODO: remove this dummy data
    const results = [
      'QmZtmD2qt6fJot32nabSP3CUjicnypEBz7bHVDhPQt9aAy',
      'QmZtmD2qt6fJot32nabSP3CUjicnypEBz7bHVDhPQt9aAy',
      'QmZtmD2qt6fJot32nabSP3CUjicnypEBz7bHVDhPQt9aAy',
      'QmZtmD2qt6fJot32nabSP3CUjicnypEBz7bHVDhPQt9aAy',
    ]

    yield put({ type: GET_LEAKS__SUCCESS, data: results })
  } catch (err) {
    // Dispatch arbitrary on-error action
    yield put({ type: GET_LEAKS__ERROR, payload: err.message })
    console.error('error fetching terms json', err)
  }
}

export default function* getLeaks() {
  yield takeLatest(GET_LEAKS, _getLeaks)
}
