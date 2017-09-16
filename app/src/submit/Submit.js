import React, { PropTypes } from 'react'
import Dropzone from 'react-dropzone'

const Submit = (props) =>
  <div className="submit">
    <Dropzone
      onDrop={props.submitDocument}
    >
      <p>Upload here...</p>
    </Dropzone>
  </div>

Submit.propTypes = {
  submitStatus: PropTypes.object.isRequired,
  submitDocument: PropTypes.func.isRequired,
}

export default Submit
