import React from 'react'
import styles from './Chat.module.css'
import MessageForm from './MessageForm/MessageForm'

class Chat extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      messages: []
    }
    this.bottom = React.createRef()
  }

  componentDidMount() {
    App.cable.subscriptions.create(
      { channel: 'ChatChannel' },
      {
        received: (data) => {
          this.setState({messages: [...this.state.messages, [data.message, data.username, data.color]]})
        },
        speak: function (data) {
          return this.perform('speak', data)
        },
      },
    )
  }

  componentDidUpdate() {
    if (this.bottom.current !== null) {
      this.bottom.current.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' })
    }
  }

  render() {
    const messageList = this.state.messages.map((message, idx) => {
      return (
        <li className={styles.messageLi} key={idx}>
          <p>
            <span style={{ color: message[2] }} className={styles.username}>
              {`${message[1]}:   `}
            </span>
            <span className={styles.messageBody}>
              {`${message[0]}`}
            </span>
          </p>
          <div ref={this.bottom} />
        </li>
      )
    })
    return (
      <div className={styles.chatWrapper}>
        <ul className={styles.messageList}>
          {messageList}
        </ul>
        <MessageForm currentUser={this.props.currentUser}/>
      </div>
    )
  }
}

export default Chat
