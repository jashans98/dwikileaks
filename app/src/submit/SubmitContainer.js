import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

// SELECTORS
import { selectSubmitStatus } from './SubmitSelectors'

// ACTIONS
import { submitDocument } from './actions'

class SubmitContainer extends Component {
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
}

export default connect(createStructuredSelector({
  submitStatus: selectSubmitStatus,
}), {
  submitDocument,
})(SubmitContainer)

