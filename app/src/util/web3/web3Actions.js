import {
  WEB3_INITIALIZED,
  WEB3_NOEXIST,
} from './web3Constants'

const web3Initialized = results => ({
  type: WEB3_INITIALIZED,
})

const web3NoExist = results => ({
  type: WEB3_NOEXIST
})

export {
  web3Initialized,
  web3NoExist,
}
