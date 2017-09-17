import React, { Component } from 'react'

class Home extends Component {
  render() {
    return(
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1">
            <h1>dWikiLeaks</h1>
            <p>dWikiLeaks provides a secure medium by which whistleblowers can anonymously and securely submit sensitive documents to a trusted organization for analysis. This is enabled by a purely peer-to-peer network architecture (no http requests to central authorities) for distributed file storage, end-to-end RSA encryption, and Ethereum.</p>
            <p>If you would like to submit a leak, follow the instructions on our submit page</p>
          </div>
        </div>
      </main>
    )
  }
}

export default Home
