import React from 'react'
import { Card, Text, Heading } from 'rebass'
import styled from 'styled-components'

const Wrapper = styled.div`
  margin: 0 auto;
  margin-top: 100px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Admin = props =>
  <Wrapper>
    <Heading
      style={{
        marginBottom: '50px'
      }}
    >Here are your latest file submissions</Heading>

    {props.leaks.length && props.leaks.map((leak, i) =>
      <Card
        style={{
          padding: '30px 5px',
          borderRadius: '10px',
          background: '#eee',
          border: 'solid 2px #bcbcbc',
          marginBottom: '15px',
        }}
        onClick={() => props.downloadDocument(leak)}
        key={i}
        px={3}
        py={4}
        mt={2}
        mb={3}
        width={[ 1, 1/2 ]}
        fontSize={[ 4, 5, 6 ]}
        color='black'
        bg='grey'
      >
        <Text
          style={{
            fontSize: '15px',
          }}
        >
          {leak}
        </Text>
      </Card>
    )}
  </Wrapper>

Admin.propTypes = {}

export default Admin

