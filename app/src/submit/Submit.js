import React, { PropTypes } from 'react'
import Dropzone from 'react-dropzone'
import styled from 'styled-components'

import Spinner from '../components/spinner/Spinner'
import Infobox from '../components/infobox/Infobox'
import Instructions from './Instructions'

const Wrapper = styled.div`
  display: flex;
  position: absolute;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`

const StyledDropzone = styled(Dropzone)`
  text-align: center;
  margin: 0 auto;
  padding: 20px;
  height: 100px;
  width: 100px;
  color: red;
  border-style: dashed;
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

const getUpload = (submit) =>
  <div>
    <Instructions />
    <StyledDropzone
      onDrop={submit}
    >
      <StyledSubmitText>
        Drag file here
      </StyledSubmitText>
    </StyledDropzone>
  </div>

  // Return success or fail state
const checkFail = status => status.success ?
  <Infobox text="Success!" /> :
  <Infobox error text="Woops. There was an error uploading" />

  const Submit = (props) => {
    const { submitStatus } = props

    if (!submitStatus.pending &&
      (submitStatus.fail ||
      submitStatus.success)) return checkFail(submitStatus)

    return <Wrapper className="submit">
      {!props.submitStatus.pending ?
          getUpload(props.submitDocument) :
          <Spinner />}
        </Wrapper>
  }

Submit.propTypes = {
  submitStatus: PropTypes.object.isRequired,
  submitDocument: PropTypes.func.isRequired,
}

export default Submit
