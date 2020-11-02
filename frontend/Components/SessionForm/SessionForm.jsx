import React from 'react'
import styles from './SessionForm.module.css'
import { createUser, createSession } from '../../util/session_api_util'

class SessionForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      errors: null,
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  update(type) {
    return (e) => {
      this.setState({ [type]: e.currentTarget.value })
    }
  }

  handleSubmit(e, formType) {
    const { username, password } = this.state
    e.preventDefault()
    if (formType === 'Sign Up') {
      createUser({ username, password })
        .then((res) => this.props.login(res.user))
        .fail((res) => {
          this.setState({ errors: res.responseJSON })
        })
    } else {
      createSession({ username, password })
        .then((res) => this.props.login(res.user))
        .fail((res) => {
          this.setState({ errors: res.responseJSON })
        })
    }
  }

  render() {
    const { toggleForm, formType } = this.props
    const { username, password, errors } = this.state
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
            {
              errors && errors.usernameError ? <h3>{errors.usernameError}</h3> : null
            }
            <label className={styles.formLabel}>
              <h4>Password</h4>
              <input className={styles.formInput} type="password" value={password} onChange={this.update('password')} />
            </label>
            {
              errors && errors.passwordError ? <h3>{errors.passwordError}</h3> : null
            }
            <button type="submit">{formType}</button>
          </form>
        </div>
      </div>
    )
  }
}

export default SessionForm
