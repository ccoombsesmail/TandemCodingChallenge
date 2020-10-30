class ChatChannel < ApplicationCable::Channel
  def subscribed
    # stream_from "some_channel"
    stream_for "chat_room"
  end

  def speak(data)
    broadcastMessage = {message: data['body'], username: data['username'], color: data['color']}
    ChatChannel.broadcast_to("chat_room", broadcastMessage)

  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
