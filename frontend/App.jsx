import React from 'react'
import Quiz from './Components/Quiz/Quiz'
import styles from './App.module.css'
import SessionForm from './Components/SessionForm/SessionForm'
import { deleteSession } from './util/session_api_util'

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      showLogin: false,
      formType: 'Login',
      currentUser: undefined,

    }
    this.toggleForm = this.toggleForm.bind(this)
    this.logout = this.logout.bind(this)
    this.login = this.login.bind(this)
  }

  componentDidMount() {
    const currentUser = window.currentUser
    this.setState({
      currentUser,
    })
  }

  toggleForm(formType) {
    this.setState({
      showLogin: !this.state.showLogin,
      formType,
    })
  }

  logout() {
    deleteSession().then(() => {
      this.setState({ currentUser: undefined })
    })
  }

  login(currentUser) {
    console.log(currentUser)
    this.setState({
      currentUser,
    })
  }

  render() {
    const { showLogin, formType, currentUser } = this.state
    return (
      <div className={styles.appWrapper}>
        <header>
          {
            currentUser !== undefined ?
              (
                <>
                  <h1>
                    Hello
                    <b>{currentUser.username}</b>
                  </h1>
                  <div className={styles.left}>
                    <img alt="" src="https://i.ibb.co/w7ZcC9s/mental-health.png" height="40px" width="40px" />
                    <h1>Tandemonium</h1>
                  </div>
                  <button className={styles.login} type="button" onClick={this.logout}>Logout</button> 
                </>
              ) : (
                <>
                  <div className={styles.left}>
                    <img alt="" src="https://i.ibb.co/w7ZcC9s/mental-health.png" height="40px" width="40px" />
                    <h1>Tandemonium</h1>
                  </div>
                  <div className={styles.right}>
                    <button className={styles.login} type="button" onClick={() => this.toggleForm('Login')}>
                      Login
                    </button>
                    <button className={styles.login} type="button" onClick={() => this.toggleForm('Sign Up')}>
                      Sign Up
                    </button>
                  </div>
                </>
              )
          }
        </header>
        {
         showLogin === true ? <SessionForm login={this.login} formType={formType} toggleForm={this.toggleForm} /> : null
        }
        <Quiz />
        <div className={styles.brains}>
          <img alt="" src="https://i.ibb.co/w7ZcC9s/mental-health.png" height="75px" width="75px" />
          <img alt="" src="https://i.ibb.co/w7ZcC9s/mental-health.png" height="75px" width="75px" />
          <img alt="" src="https://i.ibb.co/w7ZcC9s/mental-health.png" height="75px" width="75px" />
          <img alt="" src="https://i.ibb.co/w7ZcC9s/mental-health.png" height="75px" width="75px" />
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
