// src/chat/socket.js
import { io as clientIO } from 'socket.io-client';

const URL = 'http://localhost:5000'; // Adjust if needed
export const socket = clientIO(URL, { autoConnect: false });

export function connectSocket(userId) {
  if (!socket.connected) {
    socket.connect();
    socket.emit('identify', userId);
  }
}

export function sendPrivateMessage({ from, to, message }) {
  socket.emit('private-message', { from, to, message });
}

export function onPrivateMessage(callback) {
  socket.on('private-message', callback);
}
