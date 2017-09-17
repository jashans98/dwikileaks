import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import Web3 from 'web3'

import Infobox from '../components/infobox/Infobox'
import Spinner from '../components/spinner/Spinner'
import Admin from './Admin'

// SELECTORS
import { selectGetLeakStatus, selectLeakData } from './AdminSelectors'
import { selectWeb3Status } from '../util/web3/web3Selectors'

// ACTIONS
// import { AdminDocument } from './AdminActions'
import { web3Initialized, web3NoExist } from '../util/web3/web3Actions'
import { getLeaks, downloadDocument } from './AdminActions'

// import Admin from './Admin'

class AdminContainer extends Component {
  checkWeb3 = () => {
    const { web3Initialized, web3NoExist, getLeaks } = this.props

    // Checking if Web3 has been injected by the browser (Mist/MetaMask)
    if (typeof window.web3 !== 'undefined') {
      // Set to window object for now
      window.w = new Web3(window.web3.currentProvider)

      console.log('Injected web3 detected.')

      web3Initialized()
      getLeaks()
    } else {
      console.log('web3 provider not found')
      // no metamask? flag for now
      web3NoExist()
    }
  }

  componentDidMount() {
    // Check incase we're coming from a different route
    // => effectively push to redux
    if (window.web3) this.checkWeb3()

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
      <div className="AdminContainer">
        {web3Status.exists ?
            <Admin {...this.props} /> :
            <Infobox
              text="Woops. We couldn't find Metamask."
              subtext="Please ensure it's on."
            />
        }
      </div>
    )
  }
}

AdminContainer.propTypes = {
  getLeakStatus: PropTypes.object.isRequired,
  web3Status: PropTypes.object.isRequired,

  web3Initialized: PropTypes.func.isRequired,
  web3NoExist: PropTypes.func.isRequired,
}

export default connect(createStructuredSelector({
  getLeakStatus: selectGetLeakStatus,
  web3Status: selectWeb3Status,
  leaks: selectLeakData,
}), {
  web3Initialized,
  web3NoExist,
  getLeaks,
  downloadDocument,
})(AdminContainer);