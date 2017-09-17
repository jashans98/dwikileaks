import React from 'react'
import { Card, Text } from 'rebass'

const Admin = props =>
  <div>
    {props.leaks.length && props.leaks.map((leak, i) =>
      <Card
        onClick={() => props.downloadDocument(leak)}
        key={i}
        px={3}
        py={4}
        mt={2}
        mb={3}
        width={[ 1, 1/2 ]}
        fontSize={[ 4, 5, 6 ]}
        color='white'
        bg='blue'
      >
        <Text>
          {leak}
        </Text>
      </Card>
    )}
  </div>

Admin.propTypes = {}

export default Admin

