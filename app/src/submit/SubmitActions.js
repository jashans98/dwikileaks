import {
  SUBMIT_FILE,
} from './SubmitConstants'

const submitDocument = (doc) => ({
  type: SUBMIT_FILE,
  payload: doc,
})

export {
  submitDocument,
}
