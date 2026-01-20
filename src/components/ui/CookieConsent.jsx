import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Shield, Cookie } from 'lucide-react';
import Button from './Button';

const CookieConsent = () => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('velox_cookie_consent');
    if (!consent) {
      // Show banner after 1 second delay
      setTimeout(() => setShowBanner(true), 1000);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('velox_cookie_consent', JSON.stringify({
      accepted: true,
      date: new Date().toISOString(),
      analytics: true,
      marketing: true
    }));
    setShowBanner(false);
  };

  const handleDecline = () => {
    localStorage.setItem('velox_cookie_consent', JSON.stringify({
      accepted: false,
      date: new Date().toISOString(),
      analytics: false,
      marketing: false
    }));
    setShowBanner(false);
  };

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6"
        >
          <div className="max-w-7xl mx-auto">
            <div className="bg-card border-2 border-primary/20 rounded-lg shadow-2xl p-6">
              <div className="flex items-start gap-4">
                {/* Icon */}
                <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <Cookie className="w-6 h-6 text-primary" />
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
                    <Shield className="w-5 h-5 text-primary" />
                    Cookie Consent
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. 
                    By clicking "Accept All", you consent to our use of cookies. You can manage your preferences in our{' '}
                    <a href="/privacy-policy" className="text-primary hover:underline">
                      Privacy Policy
                    </a>.
                  </p>

                  {/* Actions */}
                  <div className="flex flex-wrap gap-3">
                    <Button onClick={handleAccept} size="sm">
                      Accept All
                    </Button>
                    <Button onClick={handleDecline} variant="outline" size="sm">
                      Decline
                    </Button>
                    <button
                      onClick={() => setShowBanner(false)}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Close
                    </button>
                  </div>
                </div>

                {/* Close Button */}
                <button
                  onClick={() => setShowBanner(false)}
                  className="p-2 rounded-lg hover:bg-muted/30 transition-colors flex-shrink-0"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieConsent;
