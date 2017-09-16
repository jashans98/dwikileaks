import React, { PropTypes } from 'react'
import { Message } from 'rebass'

const ErrorMessage = (props) =>
  <Message>
    {props.text}
    <hr />
    {!!props.subText && props.subText}
  </Message>

ErrorMessage.propTypes = {
  text: PropTypes.string.isRequired,
}

export default ErrorMessage
