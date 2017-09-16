import { all } from 'redux-saga/effects'
import submitDocument from './submit/SubmitSagas'

export default function* rootSaga() {
	yield all([
		submitDocument,
	])
}
