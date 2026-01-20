import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Home, Search, ArrowLeft } from 'lucide-react';
import Button from '../../components/ui/Button';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      <div className="max-w-2xl w-full text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Animated 404 */}
          <motion.h1
            className="text-[120px] md:text-[200px] font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-purple-600 leading-none"
            animate={{ 
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            }}
            transition={{ 
              duration: 5, 
              repeat: Infinity,
              ease: 'linear'
            }}
            style={{ backgroundSize: '200% 200%' }}
          >
            404
          </motion.h1>

          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Page Not Found
          </h2>
          
          <p className="text-xl text-muted-foreground mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link to="/">
              <Button size="lg">
                <Home className="w-5 h-5 mr-2" />
                Back to Home
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline">
                <Search className="w-5 h-5 mr-2" />
                Contact Support
              </Button>
            </Link>
          </div>

          {/* Quick Links */}
          <div className="border-t border-border pt-8">
            <p className="text-sm text-muted-foreground mb-4">Try these instead:</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/portfolio" className="text-primary hover:underline">
                Portfolio
              </Link>
              <Link to="/blog" className="text-primary hover:underline">
                Blog
              </Link>
              <Link to="/case-studies" className="text-primary hover:underline">
                Case Studies
              </Link>
              <Link to="/pricing" className="text-primary hover:underline">
                Pricing
              </Link>
              <Link to="/faq" className="text-primary hover:underline">
                FAQ
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;
