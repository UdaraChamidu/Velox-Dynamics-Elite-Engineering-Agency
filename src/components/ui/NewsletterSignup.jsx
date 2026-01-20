import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Send } from 'lucide-react';
import Button from './Button';
import Input from './Input';

const NewsletterSignup = ({ onSubscribe, className = '' }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null); // 'success' | 'error' | null

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    setStatus(null);

    try {
      // Call the onSubscribe callback (will integrate with EmailJS later)
      if (onSubscribe) {
        await onSubscribe(email);
      }
      setStatus('success');
      setEmail('');
    } catch (error) {
      setStatus('error');
    } finally {
      setLoading(false);
      // Reset status after 5 seconds
      setTimeout(() => setStatus(null), 5000);
    }
  };

  return (
    <div className={`${className}`}>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
            className="pl-10"
          />
        </div>
        <Button 
          type="submit" 
          disabled={loading || !email}
          className="whitespace-nowrap"
        >
          {loading ? (
            <>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              >
                <Send className="w-4 h-4 mr-2" />
              </motion.div>
              Subscribing...
            </>
          ) : (
            <>
              <Send className="w-4 h-4 mr-2" />
              Subscribe
            </>
          )}
        </Button>
      </form>

      {status === 'success' && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm text-green-400 mt-2"
        >
          ✓ Successfully subscribed! Check your email for confirmation.
        </motion.p>
      )}

      {status === 'error' && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm text-red-400 mt-2"
        >
          ✗ Failed to subscribe. Please try again.
        </motion.p>
      )}
    </div>
  );
};

export default NewsletterSignup;
