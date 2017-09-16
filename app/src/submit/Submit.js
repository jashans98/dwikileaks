import React, { PropTypes } from 'react'
import Dropzone from 'react-dropzone'
import styled from 'styled-components'

import Spinner from '../spinner/Spinner'

const Wrapper = styled.div`
  display: flex;
  position: absolute;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`

const StyledSubmitText = styled.p`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  padding: 10px;
  box-sizing: border-box;
`

  // Return success or fail state
const checkFail = status => status.success ?
  <div>success!</div> :
  <div>fail!</div>

  const Submit = (props) => {
    const { submitStatus } = props

    if (!submitStatus.pending &&
      (submitStatus.fail ||
      submitStatus.success)) return checkFail(submitStatus)

    return <Wrapper className="submit">
      {!props.submitStatus.pending ?
          <Dropzone
            onDrop={props.submitDocument}
          >
            <StyledSubmitText>
              Click here, or drag file to upload.
            </StyledSubmitText>
          </Dropzone> :
          <Spinner />}
        </Wrapper>
  }

Submit.propTypes = {
  submitStatus: PropTypes.object.isRequired,
  submitDocument: PropTypes.func.isRequired,
}

export default Submit
