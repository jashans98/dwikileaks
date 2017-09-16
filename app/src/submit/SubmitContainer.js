import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import Web3 from 'web3'

// SELECTORS
import { selectSubmitStatus } from './SubmitSelectors'

// ACTIONS
import { submitDocument } from './SubmitActions'
import { web3Initialized, web3NoExist } from '../util/web3/web3Actions'

class SubmitContainer extends Component {
  componentDidMount() {
    // Wait for loading completion to avoid race conditions with web3 injection timing.

    // as per
    window.addEventListener('load', () => {
      const { web3Initialized, web3NoExist } = this.props

      // Checking if Web3 has been injected by the browser (Mist/MetaMask)
      if (typeof window.web3 !== 'undefined') {
        // Set to window object for now
        window.w = new Web3(window.web3.currentProvider)

        console.log('Injected web3 detected.')
        web3Initialized()
      } else {
        console.log('web3 provider not found')
        // no metamask? flag for now
        web3NoExist()
      }
      })
    }

  render() {
    const { submitDocument } = this.props

    return (
      <div className="SubmitContainer">
        <button onClick={submitDocument}>submit</button>
      </div>
    )
  }
}

SubmitContainer.propTypes = {
  submitStatus: PropTypes.object.isRequired,
  submitDocument: PropTypes.func.isRequired,

  web3Initialized: PropTypes.func.isRequired,
  web3NoExist: PropTypes.func.isRequired,
}

export default connect(createStructuredSelector({
  submitStatus: selectSubmitStatus,
}), {
  submitDocument,
  web3Initialized,
  web3NoExist,
})(SubmitContainer)

