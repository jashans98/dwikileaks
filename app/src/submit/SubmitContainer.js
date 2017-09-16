import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import Web3 from 'web3'

import Infobox from '../components/infobox/Infobox'
import Spinner from '../components/spinner/Spinner'

// SELECTORS
import { selectSubmitStatus } from './SubmitSelectors'
import { selectWeb3Status } from '../util/web3/web3Selectors'

// ACTIONS
import { submitDocument } from './SubmitActions'
import { web3Initialized, web3NoExist } from '../util/web3/web3Actions'

import Submit from './Submit'

class SubmitContainer extends Component {
  checkWeb3 = () => {
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
  }

  componentWillMount() {
    if (!this.props.web3Status.checked) this.checkWeb3()
  }

  componentDidMount() {
    // Wait for loading completion to avoid race conditions with web3 injection timing.
    window.addEventListener('load', this.checkWeb3)
  }
  componentWillUnmount() {
    window.removeEventListener('load', this.checkWeb3)
  }

  render() {
    const { web3Status } = this.props

    if (!web3Status.checked) return <Spinner />

    return (
      <div className="SubmitContainer">
        {web3Status.exists ?
            <Submit {...this.props} /> :
            <Infobox
              text="Woops. We couldn't find Metamask."
              subtext="Please ensure it's on."
            />
        }
      </div>
    )
  }
}

SubmitContainer.propTypes = {
  submitStatus: PropTypes.object.isRequired,
  web3Status: PropTypes.object.isRequired,

  submitDocument: PropTypes.func.isRequired,

  web3Initialized: PropTypes.func.isRequired,
  web3NoExist: PropTypes.func.isRequired,
}

export default connect(createStructuredSelector({
  submitStatus: selectSubmitStatus,
  web3Status: selectWeb3Status,
}), {
  submitDocument,
  web3Initialized,
  web3NoExist,
})(SubmitContainer)

