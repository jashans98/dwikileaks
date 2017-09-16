import React, { PropTypes } from 'react'
import { Message } from 'rebass'

const ErrorMessage = (props) => {
  const conditioning = {}
  if (props.bad) conditioning.background = 'red'

  return (
    <Message
      style={conditioning}
    >
      {props.text}
      <hr />
      {!!props.subText && props.subText}
    </Message>
  )
}

ErrorMessage.propTypes = {
  text: PropTypes.string.isRequired,
}

export default ErrorMessage
