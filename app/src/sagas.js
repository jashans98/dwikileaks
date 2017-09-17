import { fork } from 'redux-saga/effects'
import submitDocument from './submit/SubmitSagas'
import getLeaks from './admin/AdminSagas'

export default function* rootSaga() {
	yield [
		fork(submitDocument),
		fork(getLeaks),
	]
}
