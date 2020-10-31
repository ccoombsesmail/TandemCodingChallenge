Tandemonium
======

Tandemonium is a quiz app that allows users to take random quizzes, see their scores, and compare them to other user's top scores. Tandemonium also allows users to chat live while taking their quizzes.

Live site: https://tandemonium.herokuapp.com



### Technologies

- Frontend: React, Webpack
- Backend: Ruby on Rails, Action Cable/WebSockets
- Database: Postgres
- Hosting: Heroku

Envirornment/engines:
- ruby 2.5.1
- node 10.3.0
- npm 6.4.1


### How To Run Locally
- Clone this respository
- npm install and bundle install
- Start up Postgres
- rails db:setup
- Start rails server (rails s)
- Navigate to http://localhost:3000



### Live Chat


Action Cable was used to implement WebSockets with the Rails backend. An example of a subscription to the chat room is shown below: 

```javascript
App.cable.subscriptions.create(
    {channel: "ChatChannel", },
    {
        received: data => {
            this.setState({
                messages: [...this.state.messages, [data.message, data.username, data.color]],
            })
        },
        speak: function(data) {
            return this.perform("speak", data)
        }
    }
)
```

And on the backend 
```ruby
def subscribed
    # stream_from "some_channel"
    stream_for "chat_room"
  end

  def speak(data)
    broadcastMessage = {message: data['body'], username: data['username'], color: data['color']}
    ChatChannel.broadcast_to("chat_room", broadcastMessage)

  end
```
