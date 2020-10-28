import React from 'react'

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      showLogin: false,
    }
  }

  render() {
    const { showLogin } = this.state
    return (
      <h1>{ showLogin.toString() }</h1>
    )
  }
}

export default App
