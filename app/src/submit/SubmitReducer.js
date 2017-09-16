import { fromJS } from 'immutable'
import {
  SUBMIT_FILE,
  SUBMIT_FILE__SUCCESS,
  SUBMIT_FILE__ERROR,
} from './SubmitConstants'

const initialState = fromJS({
  submitPending: false,
  submitFail: false,
  submitSuccess: false,
})

export default function submit(state = initialState, action) {
  switch (action.type) {
    case SUBMIT_FILE:
      return state
        .set('submitPending', true)
        .set('submitFail', false)
        .set('submitSuccess', false)

    case SUBMIT_FILE__SUCCESS:
      return state
        .set('submitPending', false)
        .set('submitFail', false)
        .set('submitSuccess', true)

    case SUBMIT_FILE__ERROR:
      return state
        .set('submitPending', false)
        .set('submitFail', true)
        .set('submitSuccess', false)

    default: return state
  }
}
