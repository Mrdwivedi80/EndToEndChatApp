// server.js
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);

// Configure CORS
// Allow the dev server origin (Vite default 5173) and fallback to 3000 if provided.
const allowedOrigins = process.env.CLIENT_ORIGIN
  ? process.env.CLIENT_ORIGIN.split(',')
  : [
      'http://localhost:5173', // Vite dev server
      'http://localhost:3000',
      "https://chatapp-client-sage.vercel.app/" // alternate dev origin
    ];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (mobile apps, curl)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) !== -1) {
        return callback(null, true);
      }
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    },
    credentials: true
  })
);

// Socket.IO with CORS configuration
const io = socketIo(server, {
      cors: {
        origin: (origin, callback) => {
          // Allow non-browser tools (like curl, server-to-server)
          if (!origin) return callback(null, true);
          if (allowedOrigins.includes(origin)) return callback(null, true);
          return callback(new Error('Origin not allowed by CORS'));
        },
        methods: ['GET', 'POST']
      }
    });

// Store connected users
const connectedUsers = new Map();

io.on('connection', (socket) => {
  const username = socket.handshake.query.username;
  
  console.log(`✅ User connected: ${username} (${socket.id})`);
  
  // Add user to connected users
  connectedUsers.set(socket.id, username);
  
  // Broadcast updated user list to all clients
  io.emit('user-list', Array.from(connectedUsers.values()));

  // Handle incoming encrypted messages
  socket.on('message', (data) => {
    console.log(`📨 Message from ${username} (encrypted)`);
    
    // Broadcast encrypted message to all other clients
    socket.broadcast.emit('message', {
      username: username,
      message: data.message, // Still encrypted
      timestamp: data.timestamp
    });
  });

  // Handle typing indicator
  socket.on('typing', () => {
    socket.broadcast.emit('user-typing', {
      username: username
    });
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log(`❌ User disconnected: ${username} (${socket.id})`);
    
    // Remove user from connected users
    connectedUsers.delete(socket.id);
    
    // Broadcast updated user list
    io.emit('user-list', Array.from(connectedUsers.values()));
  });
});

// Basic health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    connectedUsers: connectedUsers.size,
    timestamp: new Date().toISOString()
  });
});

const PORT = process.env.PORT || 3001;

server.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════╗
║         EncChat Server Started         ║
╠════════════════════════════════════════╣
║  Port: ${PORT}                            ║
║  Status: Running                       ║
║  Encryption: Client-side (E2E)         ║
║  Storage: None (ephemeral)             ║
╚════════════════════════════════════════╝
  `);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
  });
});
