import React, { useState } from "react";
import styles from './MessageForm.module.css'

const MessageForm = ({ currentUser }) => {
  const colors = ["#A86DFF", "0D6F86", "#1C6BBA", "#851F20", "#54BC75", "#DB80E1"]

  const [body, setBody] = useState('')
  const [usernameColor, setColor] = useState(colors[Math.floor(Math.random() * 6)])
  const update = () => {
    return (e) => {
      setBody(e.currentTarget.value)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    let username = "Anonymous"
    if (currentUser) {
      username = currentUser.username
    }
    App.cable.subscriptions.subscriptions[1].speak({ body: body, username: username, color: usernameColor })
    setBody('')
  }

  return (
    <div className={styles.messageFormWrapper}>
      <form className={styles.messageForm} onSubmit={handleSubmit.bind(this)}>
        <input
          className={styles.messageSubmit}
          type="text"
          value={body}
          onChange={update('body')}
          placeholder="Send A Message"
          autoComplete="off"
        />
        <div className={styles.submitButtonWrapper}>
          <button type="submit" className={styles.chatButton}>
            Chat
          </button>
        </div>
      </form>
    </div>
  )
}

export default MessageForm
