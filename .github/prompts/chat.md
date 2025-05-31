# Chat Functionality

Implement real-time private chat using Socket.IO.

## On the server:
- Handle `private-message` events
- Emit messages to the target user’s socket ID

## On the client:
- Connect to socket server
- Emit `private-message`
- Listen for `private-message` and update UI

Persist chat messages to MongoDB if needed.
