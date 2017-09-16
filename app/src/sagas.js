import { fork } from 'redux-saga/effects'
import submitDocument from './submit/SubmitSagas'

export default function* rootSaga() {
	yield [
		fork(submitDocument),
	]
}
