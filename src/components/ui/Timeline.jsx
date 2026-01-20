import React from 'react';
import { motion } from 'framer-motion';
import { Clock, CheckCircle, AlertCircle, MessageSquare, FileText } from 'lucide-react';

const Timeline = ({ events = [] }) => {
  const getEventIcon = (type) => {
    switch (type) {
      case 'status_change':
        return CheckCircle;
      case 'comment':
        return MessageSquare;
      case 'file_upload':
        return FileText;
      case 'alert':
        return AlertCircle;
      default:
        return Clock;
    }
  };

  const getEventColor = (type) => {
    switch (type) {
      case 'status_change':
        return 'text-green-400 bg-green-500/20';
      case 'comment':
        return 'text-blue-400 bg-blue-500/20';
      case 'file_upload':
        return 'text-purple-400 bg-purple-500/20';
      case 'alert':
        return 'text-yellow-400 bg-yellow-500/20';
      default:
        return 'text-muted-foreground bg-muted/20';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffHours < 1) {
      const diffMins = Math.floor(diffMs / 60000);
      return diffMins < 1 ? 'Just now' : `${diffMins}m ago`;
    }
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays}d ago`;
    
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
    });
  };

  if (events.length === 0) {
    return (
      <div className="p-8 text-center text-muted-foreground">
        <Clock className="w-12 h-12 mx-auto mb-3 opacity-30" />
        <p>No activity yet</p>
      </div>
    );
  }

  return (
    <div className="relative space-y-6">
      {/* Timeline Line */}
      <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-border" />

      {events.map((event, index) => {
        const Icon = getEventIcon(event.type);
        const colorClass = getEventColor(event.type);

        return (
          <motion.div
            key={event.id || index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="relative pl-14"
          >
            {/* Icon */}
            <div className={`absolute left-0 w-10 h-10 rounded-full ${colorClass} flex items-center justify-center z-10`}>
              <Icon className="w-5 h-5" />
            </div>

            {/* Content Card */}
            <div className="bg-card border border-border rounded-lg p-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h4 className="font-medium text-foreground mb-1">{event.title}</h4>
                  {event.description && (
                    <p className="text-sm text-muted-foreground">{event.description}</p>
                  )}
                  {event.metadata && (
                    <div className="mt-2 text-xs text-muted-foreground space-y-1">
                      {Object.entries(event.metadata).map(([key, value]) => (
                        <div key={key}>
                          <span className="font-medium capitalize">{key.replace('_', ' ')}:</span> {value}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="text-xs text-muted-foreground whitespace-nowrap">
                  {formatDate(event.timestamp)}
                </div>
              </div>

              {event.author && (
                <div className="mt-3 pt-3 border-t border-border flex items-center gap-2 text-xs text-muted-foreground">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-xs font-bold">
                    {event.author[0]}
                  </div>
                  <span>{event.author}</span>
                </div>
              )}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default Timeline;
