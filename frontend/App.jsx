import React from 'react'
import Quiz from './Components/Quiz/Quiz'
import styles from './App.module.css'

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
      <div className={styles.appWrapper}>
        <header>

        </header>
      
        <Quiz />
        <div className={styles.brains}>
          <img alt="" src="https://i.ibb.co/w7ZcC9s/mental-health.png" height="75px" width="75px" />
          <img alt="" src="https://i.ibb.co/w7ZcC9s/mental-health.png" height="75px" width="75px" />
          <img alt="" src="https://i.ibb.co/w7ZcC9s/mental-health.png" height="75px" width="75px" />
          <img alt="" src="https://i.ibb.co/w7ZcC9s/mental-health.png" height="75px" width="75px" />
        </div>
      </div>
    )
  }
}

export default App
