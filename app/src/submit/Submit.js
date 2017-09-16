import React, { PropTypes } from 'react'
import Dropzone from 'react-dropzone'
import styled from 'styled-components'

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

const Submit = (props) =>
  <Wrapper className="submit">
    <Dropzone
      onDrop={props.submitDocument}
    >
      <StyledSubmitText>
        Click here, or drag file to upload.
      </StyledSubmitText>
    </Dropzone>
  </Wrapper>

Submit.propTypes = {
  submitStatus: PropTypes.object.isRequired,
  submitDocument: PropTypes.func.isRequired,
}

export default Submit
