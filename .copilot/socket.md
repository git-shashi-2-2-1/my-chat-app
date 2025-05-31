# Socket.IO Setup

Set up WebSocket communication using Socket.IO.

In `server/socket/index.js`:
- Listen for connection and disconnection
- Store socket ID to each user
- Broadcast user online/offline status

Supported events:
- `user-connected`
- `user-disconnected`
- `private-message` (from one user to another)

Send payloads as:
{
  "from": "userId",
  "to": "userId",
  "message": "text"
}
