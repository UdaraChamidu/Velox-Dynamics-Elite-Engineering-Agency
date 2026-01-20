import React, { useState, useEffect } from 'react';
import { MessageSquare, Search, User } from 'lucide-react';
import DashboardNav from '../../components/navigation/DashboardNav';
import Card from '../../components/ui/Card';
import ChatBox from '../../components/ui/ChatBox';
import { useAuth } from '../../contexts/AuthContext';
import { useData } from '../../contexts/DataContext';

const Messages = () => {
  const { currentUser } = useAuth();
  const { getUserConversations, getConversationMessages, sendMessage, markMessagesAsRead } = useData();
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const conversations = getUserConversations(currentUser.id);
  const filteredConversations = conversations.filter(conv => 
    searchQuery === '' || conv.lastMessage?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Auto-select first conversation if none selected
  useEffect(() => {
    if (conversations.length > 0 && !selectedConversation) {
      handleSelectConversation(conversations[0]);
    }
  }, [conversations]);

  const handleSelectConversation = (conversation) => {
    setSelectedConversation(conversation);
    markMessagesAsRead(conversation.id, currentUser.id);
  };

  const handleSendMessage = (message) => {
    if (!selectedConversation) return;

    sendMessage({
      ...message,
      conversationId: selectedConversation.id,
      recipientId: selectedConversation.participants.find(p => p !== currentUser.id) || 'admin'
    });
  };

  const currentMessages = selectedConversation 
    ? getConversationMessages(selectedConversation.id)
    : [];

  // If no conversations exist, show welcome message
  if (conversations.length === 0) {
    return (
      <DashboardNav>
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Messages</h1>
          
          <Card className="p-12 text-center">
            <MessageSquare className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
            <h2 className="text-xl font-semibold mb-2">No conversations yet</h2>
            <p className="text-muted-foreground mb-6">
              Start a conversation with our admin team by submitting a service request or proposal.
            </p>
            <a href="/dashboard/request-service">
              <button className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity">
                Request a Service
              </button>
            </a>
          </Card>
        </div>
      </DashboardNav>
    );
  }

  return (
    <DashboardNav>
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Messages</h1>

        <div className="grid lg:grid-cols-[320px,1fr] gap-6 h-[calc(100vh-200px)]">
          {/* Conversations List */}
          <Card className="overflow-hidden flex flex-col">
            {/* Search */}
            <div className="p-4 border-b border-border">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search conversations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                />
              </div>
            </div>

            {/* Conversations */}
            <div className="flex-1 overflow-y-auto">
              {filteredConversations.map((conversation) => {
                const otherParticipant = conversation.participants.find(p => p !== currentUser.id);
                const isSelected = selectedConversation?.id === conversation.id;

                return (
                  <button
                    key={conversation.id}
                    onClick={() => handleSelectConversation(conversation)}
                    className={`w-full p-4 border-b border-border hover:bg-muted/10 transition-colors text-left ${
                      isSelected ? 'bg-primary/10 border-l-4 border-l-primary' : ''
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      {/* Avatar */}
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
                        <User className="w-5 h-5 text-white" />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="font-semibold text-sm truncate">
                            {otherParticipant === 'admin' ? 'Admin Team' : otherParticipant}
                          </h3>
                          {conversation.unreadCount > 0 && (
                            <span className="w-5 h-5 bg-primary rounded-full flex items-center justify-center text-xs font-bold text-primary-foreground">
                              {conversation.unreadCount}
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground truncate">
                          {conversation.lastMessage || 'No messages yet'}
                        </p>
                        {conversation.lastMessageTime && (
                          <p className="text-xs text-muted-foreground mt-1">
                            {new Date(conversation.lastMessageTime).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </Card>

          {/* Chat Area */}
          <Card className="overflow-hidden flex flex-col">
            {selectedConversation ? (
              <>
                {/* Chat Header */}
                <div className="p-4 border-b border-border flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="font-semibold">
                      {selectedConversation.participants.find(p => p !== currentUser.id) === 'admin' 
                        ? 'Admin Team' 
                        : selectedConversation.participants.find(p => p !== currentUser.id)}
                    </h2>
                    <p className="text-xs text-muted-foreground">Active now</p>
                  </div>
                </div>

                {/* Chat Box */}
                <div className="flex-1 overflow-hidden">
                  <ChatBox
                    messages={currentMessages}
                    onSendMessage={handleSendMessage}
                    recipientName="Admin Team"
                  />
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-muted-foreground">
                <div className="text-center">
                  <MessageSquare className="w-16 h-16 mx-auto mb-4 opacity-30" />
                  <p>Select a conversation to start messaging</p>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
    </DashboardNav>
  );
};

export default Messages;
