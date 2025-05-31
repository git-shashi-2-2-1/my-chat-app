import { useState, useEffect } from 'react'
import { socket, connectSocket, sendPrivateMessage, onPrivateMessage } from './chat/socket';
import './App.css'

function App() {
  const [userId, setUserId] = useState('user1');
  const [toUserId, setToUserId] = useState('user2');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    connectSocket(userId);
    onPrivateMessage((msg) => {
      setMessages((prev) => [...prev, { ...msg, incoming: true }]);
    });
    // Cleanup
    return () => {
      socket.off('private-message');
      socket.disconnect();
    };
    // eslint-disable-next-line
  }, [userId]);

  const handleSend = () => {
    if (!message) return;
    sendPrivateMessage({ from: userId, to: toUserId, message });
    setMessages((prev) => [...prev, { from: userId, message, incoming: false }]);
    setMessage('');
  };

  return (
    <div style={{ maxWidth: 400, margin: '2rem auto', textAlign: 'left' }}>
      <h2>Simple Chat Demo</h2>
      <div style={{ marginBottom: 8 }}>
        <label>Your User ID: </label>
        <input value={userId} onChange={e => setUserId(e.target.value)} />
      </div>
      <div style={{ marginBottom: 8 }}>
        <label>Send To User ID: </label>
        <input value={toUserId} onChange={e => setToUserId(e.target.value)} />
      </div>
      <div style={{ border: '1px solid #ccc', minHeight: 100, marginBottom: 8, padding: 8 }}>
        {messages.map((msg, i) => (
          <div key={i} style={{ color: msg.incoming ? 'blue' : 'green' }}>
            <b>{msg.incoming ? msg.from : 'Me'}:</b> {msg.message}
          </div>
        ))}
      </div>
      <input
        value={message}
        onChange={e => setMessage(e.target.value)}
        placeholder="Type a message..."
        style={{ width: '70%' }}
      />
      <button onClick={handleSend} style={{ width: '28%', marginLeft: 8 }}>Send</button>
    </div>
  );
}

export default App
