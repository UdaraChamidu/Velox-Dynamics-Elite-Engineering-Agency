import React from 'react';
import { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';

const LiveChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'system',
      text: "👋 Welcome to Velox Dynamics! We're not online right now, but leave us a message and we'll get back to you via email.",
      timestamp: new Date()
    }
  ]);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      sender: 'user',
      text: newMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');

    // Acknowledge the message
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: prev.length + 1,
        sender: 'system',
        text: "Thanks for your message! Our team will review it and respond via email within 24 hours.",
        timestamp: new Date()
      }]);
    }, 800);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-[200] w-14 h-14 bg-primary text-primary-foreground rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-all glow-md"
        aria-label="Open chat"
      >
        <MessageCircle className="w-6 h-6" />
      </button>
    );
  }

  return (
    <div className={`fixed bottom-6 right-6 z-[200] w-80 ${isMinimized ? 'h-14' : 'h-[450px]'} bg-card border border-border rounded-2xl shadow-xl flex flex-col overflow-hidden transition-all duration-300`}>
      {/* Header */}
      <div
        className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white cursor-pointer"
        onClick={() => setIsMinimized(!isMinimized)}
      >
        <div className="flex items-center gap-2">
          <MessageCircle className="w-5 h-5" />
          <div>
            <p className="text-sm font-semibold">Velox Dynamics</p>
            <p className="text-xs opacity-80">Leave us a message</p>
          </div>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsOpen(false);
          }}
          className="hover:bg-white/20 rounded-full p-1 transition-colors"
          aria-label="Close chat"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Messages */}
      {!isMinimized && (
        <>
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] px-3 py-2 rounded-lg text-sm ${
                    msg.sender === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-foreground'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <form onSubmit={handleSendMessage} className="p-3 border-t border-border flex gap-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 px-3 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <button
              type="submit"
              className="w-9 h-9 bg-primary text-primary-foreground rounded-lg flex items-center justify-center hover:opacity-90 transition-opacity"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default LiveChat;
