// server/index.js
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: '*' }
});

app.use(express.json());


app.get('/', (req, res) => {
  res.send('API is running');
});

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const users = [];

// Register route
app.post('/api/auth/register', async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }
  // Check if user exists
  if (users.find(u => u.email === email)) {
    return res.status(409).json({ message: 'User already exists' });
  }
  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = { id: users.length + 1, username, email, password: hashedPassword };
  users.push(user);
  // Generate JWT
  const token = jwt.sign({ id: user.id, email: user.email }, 'secret', { expiresIn: '1h' });
  res.status(201).json({ token });
});

// Login route
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email);
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  const token = jwt.sign({ id: user.id, email: user.email }, 'secret', { expiresIn: '1h' });
  res.json({ token });
});

// Middleware to verify JWT
function authMiddleware(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.sendStatus(401);
  jwt.verify(token, 'secret', (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

// --- Socket.IO Chat Logic ---
const userSocketMap = new Map(); // userId -> socketId

io.on('connection', (socket) => {
  // Listen for user identification
  socket.on('identify', (userId) => {
    userSocketMap.set(userId, socket.id);
  });

  // Listen for private messages
  socket.on('private-message', ({ from, to, message }) => {
    const targetSocketId = userSocketMap.get(to);
    if (targetSocketId) {
      io.to(targetSocketId).emit('private-message', { from, message });
    }
  });

  socket.on('disconnect', () => {
    for (const [userId, sockId] of userSocketMap.entries()) {
      if (sockId === socket.id) {
        userSocketMap.delete(userId);
        break;
      }
    }
  });
});

// Export both app (for tests) and server (for running)
module.exports = app;
module.exports.server = server;
