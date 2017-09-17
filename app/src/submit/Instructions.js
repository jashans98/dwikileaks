import React from 'react'
import styled from 'styled-components'

// maybe could whack these in a JSON
const steps = [
  'Download MetaMask',
  'Upload a zip of the relevant documents, below:'
]

const Wrapper = styled.div`
  margin-bottom: 50px;
`

const Instructions = () =>
  <Wrapper>
    <h1>To submit a document, please:</h1>
    <ul>
      {steps.map(step => <li key={step}>{step}</li>)}
    </ul>
  </Wrapper>

export default Instructions
