import React from 'react'
import styles from './SessionForm.module.css'
import { createUser, createSession } from '../../util/session_api_util'

class SessionForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
    }
    // this.handleSubmit = this.handleSubmit.bind(this)
  }

  update(type) {
    return (e) => {
      this.setState({ [type]: e.currentTarget.value })
    }
  }

  handleSubmit(e, formType) {
    e.preventDefault()
    if (formType === 'Sign Up') {
      createUser(this.state).then((res) => this.props.login(res.user))
    } else {
      createSession(this.state).then((res) => this.props.login(res.user))
    }
  }

  render() {
    const { toggleForm, formType } = this.props
    const { username, password } = this.state
    return (
      <div className={styles.modalBg} onClick={toggleForm}>
        <div className={styles.modalChild} onClick={e => e.stopPropagation()}>
          <form className={styles.form} onSubmit={(e) => this.handleSubmit(e, formType)}>
            <h1>
              {formType}
            </h1>
            <label className={styles.formLabel}>
              <h4>Username</h4>
              <input maxLength={16} id="username" className={styles.formInput} type="text" value={username} onChange={this.update('username')} autoComplete="off" />
            </label>
            <label className={styles.formLabel}>
              <h4>Password</h4>
              <input className={styles.formInput} type="password" value={password} onChange={this.update('password')} />
            </label>
            <button type="submit">{formType}</button>
          </form>
        </div>
      </div>
    )
  }
}

export default SessionForm
