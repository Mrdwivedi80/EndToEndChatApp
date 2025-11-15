import React, { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import CryptoJS from 'crypto-js';
import { Send, Lock, Moon, Sun, User, Shield } from 'lucide-react';
import Home from './pages/Home';

const ChatApp = () => {
  const socketRef = useRef(null);
  const [username, setUsername] = useState('');
  const [connected, setConnected] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [encryptionKey, setEncryptionKey] = useState('');
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [typing, setTyping] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const messagesEndRef = useRef(null);
  const typingTimeoutRef = useRef(null);

  // If a username is provided via query (?username=...), prefill it
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const qUser = params.get('username');
    if (qUser && !username) setUsername(qUser);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Auto-scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Connect to server
  const handleConnect = () => {
    if (!username.trim()) return;

    // In a real app, this would be securely exchanged
    // For demo: using a simple shared key
    const key = 'demo-encryption-key-2024';
    setEncryptionKey(key);

    // prevent double connections
    if (socketRef.current && socketRef.current.connected) return;

    const newSocket = io('http://localhost:3001', {
      query: { username: username.trim() }
    });

    socketRef.current = newSocket;

    newSocket.on('connect', () => {
      setConnected(true);
    });

    // Attach handlers once per connection
    newSocket.on('user-list', (users) => {
      setOnlineUsers(users.filter(u => u !== username));
    });

    newSocket.on('message', (data) => {
      try {
        const decrypted = CryptoJS.AES.decrypt(data.message, key).toString(CryptoJS.enc.Utf8);
        setMessages(prev => [...prev, {
          username: data.username,
          message: decrypted,
          timestamp: data.timestamp,
          isOwn: false
        }]);
      } catch (e) {
        console.error('Decryption failed:', e);
      }
    });

    newSocket.on('user-typing', (data) => {
      if (data.username !== username) {
        setTyping(true);
        setTimeout(() => setTyping(false), 2000);
      }
    });

    newSocket.on('disconnect', () => {
      setConnected(false);
    });
  };

  // Send message
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputMessage.trim() || !socketRef.current) return;

    const encrypted = CryptoJS.AES.encrypt(inputMessage, encryptionKey).toString();
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    socketRef.current.emit('message', {
      message: encrypted,
      timestamp
    });

    setMessages(prev => [...prev, {
      username: username,
      message: inputMessage,
      timestamp,
      isOwn: true
    }]);

    setInputMessage('');
  };

  // Handle typing indicator
  const handleTyping = () => {
    if (!socketRef.current) return;

    socketRef.current.emit('typing');

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      // Typing stopped
    }, 1000);
  };

  // Disconnect
  const handleDisconnect = () => {
    if (socketRef.current) {
      socketRef.current.disconnect();
      socketRef.current = null;
      setConnected(false);
      setMessages([]);
      setOnlineUsers([]);
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, []);

  const bgColor = darkMode ? 'bg-gray-900' : 'bg-gray-50';
  const cardBg = darkMode ? 'bg-gray-800' : 'bg-white';
  const textColor = darkMode ? 'text-gray-100' : 'text-gray-900';
  const borderColor = darkMode ? 'border-gray-700' : 'border-gray-200';
  const inputBg = darkMode ? 'bg-gray-700' : 'bg-gray-100';

  if (!connected) {
    return (
      <div className={`min-h-screen ${bgColor} ${textColor} flex items-center justify-center p-4`}>
        <div className={`${cardBg} rounded-2xl shadow-2xl p-8 w-full max-w-md border ${borderColor}`}>
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
              <Shield className="w-8 h-8 text-blue-500" />
              <h1 className="text-3xl font-bold">EncChat</h1>
            </div>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-lg ${inputBg} hover:opacity-80 transition`}
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>

          <div className="mb-6 p-4 bg-blue-500 bg-opacity-10 border border-blue-500 border-opacity-30 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Lock className="w-4 h-4 text-blue-500" />
              <p className="text-sm font-semibold text-blue-500">End-to-End Encrypted</p>
            </div>
            <p className="text-xs opacity-70">Your messages are encrypted before leaving your device</p>
          </div>

          <form onSubmit={(e) => { e.preventDefault(); handleConnect(); }}>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Username</label>
              <div className="relative">
                <User className="absolute left-3 top-3 w-5 h-5 opacity-50" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                  className={`w-full pl-10 pr-4 py-3 ${inputBg} border ${borderColor} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${textColor}`}
                  maxLength={20}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={!username.trim()}
              className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              Connect to Chat
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-opacity-20 border-gray-500">
            <p className="text-xs opacity-60 text-center">
              Demo project • Messages are not stored • For educational purposes only
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${bgColor} ${textColor} flex flex-col`}>
      {/* Header */}
      <div className={`${cardBg} border-b ${borderColor} p-4 shadow-sm`}>
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Shield className="w-6 h-6 text-blue-500" />
            <div>
              <h1 className="text-xl font-bold">EncChat</h1>
              <p className="text-xs opacity-60">Logged in as {username}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className={`px-3 py-1 rounded-full ${inputBg} text-xs`}>
              <Lock className="w-3 h-3 inline mr-1" />
              Encrypted
            </div>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-lg ${inputBg} hover:opacity-80 transition`}
            >
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <button
              onClick={handleDisconnect}
              className="px-4 py-2 bg-red-500 text-white rounded-lg text-sm hover:bg-red-600 transition"
            >
              Disconnect
            </button>
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 max-w-4xl w-full mx-auto p-4 overflow-hidden flex flex-col">
        <div className="flex-1 overflow-y-auto mb-4 space-y-3">
          {messages.length === 0 && (
            <div className="text-center py-12 opacity-50">
              <Lock className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p>No messages yet. Start a secure conversation!</p>
            </div>
          )}

          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${msg.isOwn ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                  msg.isOwn
                    ? 'bg-blue-500 text-white rounded-br-sm'
                    : `${inputBg} ${textColor} rounded-bl-sm`
                }`}
              >
                {!msg.isOwn && (
                  <p className="text-xs font-semibold mb-1 opacity-70">{msg.username}</p>
                )}
                <p className="wrap-break-word">{msg.message}</p>
                <p className={`text-xs mt-1 ${msg.isOwn ? 'text-blue-100' : 'opacity-60'}`}>
                  {msg.timestamp}
                </p>
              </div>
            </div>
          ))}

          {typing && (
            <div className="flex justify-start">
              <div className={`px-4 py-2 rounded-2xl ${inputBg} rounded-bl-sm`}>
                <p className="text-sm opacity-60">Someone is typing...</p>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <form onSubmit={handleSendMessage} className={`${cardBg} rounded-xl p-3 border ${borderColor} shadow-lg`}>
          <div className="flex gap-2">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => {
                setInputMessage(e.target.value);
                handleTyping();
              }}
              placeholder="Type a message..."
              className={`flex-1 px-4 py-3 ${inputBg} border ${borderColor} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${textColor}`}
            />
            <button
              type="submit"
              disabled={!inputMessage.trim()}
              className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center gap-2"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Minimal client-side routing: show Home on "/" and ChatApp otherwise ("/chat" etc.)
const App = () => {
  const [route, setRoute] = useState(window.location.pathname || '/');

  useEffect(() => {
    const onPop = () => setRoute(window.location.pathname);
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  if (route === '/' || route === '/home') return <Home />;
  return <ChatApp />;
};

export default App;