import React, { PropTypes } from 'react'
import { Message } from 'rebass'

const Infobox = (props) => {
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

Infobox.propTypes = {
  text: PropTypes.string.isRequired,
}

export default Infobox
