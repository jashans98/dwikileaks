import {
  GET_LEAKS,
  DOWNLOAD_DOCUMENT,
} from './AdminConstants'

const getLeaks = () => ({
  type: GET_LEAKS,
})

const downloadDocument = hash => ({
  type: DOWNLOAD_DOCUMENT,
  hash,
})

export {
  getLeaks,
  downloadDocument,
}
