import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Home, RefreshCw, AlertTriangle } from 'lucide-react';
import Button from '../../components/ui/Button';

const ServerError = () => {
  const handleRetry = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      <div className="max-w-2xl w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Error Icon */}
          <motion.div
            className="mb-8 flex justify-center"
            animate={{ 
              scale: [1, 1.05, 1],
              rotate: [0, 5, -5, 0] 
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity,
              repeatDelay: 1
            }}
          >
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-red-500/20 to-pink-500/20 flex items-center justify-center">
              <AlertTriangle className="w-12 h-12 text-red-400" />
            </div>
          </motion.div>

          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-4">
            500
          </h1>

          <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-4">
            Server Error
          </h2>
          
          <p className="text-lg text-muted-foreground mb-8">
            Oops! Something went wrong on our end. Our team has been notified and we're working on it.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" onClick={handleRetry}>
              <RefreshCw className="w-5 h-5 mr-2" />
              Try Again
            </Button>
            <Link to="/">
              <Button size="lg" variant="outline">
                <Home className="w-5 h-5 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>

          {/* Support Message */}
          <div className="mt-12 p-6 bg-card border border-border rounded-lg">
            <p className="text-sm text-muted-foreground">
              If this problem persists, please{' '}
              <Link to="/contact" className="text-primary hover:underline">
                contact our support team
              </Link>
              {' '}with details about what you were trying to do.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ServerError;
