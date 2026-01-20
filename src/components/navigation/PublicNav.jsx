import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X, Zap } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const PublicNav = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'The Pack', path: '/team' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="public-navigation">
      <div className="public-navigation-container">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <img 
            src="/logo.png" 
            alt="Velox Dynamics Logo" 
            className="h-12 w-auto transition-all duration-250 hover:scale-105"
          />
        </Link>

        {/* Desktop Menu */}
        <div className="public-navigation-menu">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`public-navigation-link ${isActive(link.path) ? 'active' : ''}`}
            >
              {link.name}
            </Link>
          ))}
          {isAuthenticated ? (
            <Link
              to="/dashboard"
              className="public-navigation-link"
            >
              Dashboard
            </Link>
          ) : (
            <Link
              to="/login"
              className="public-navigation-link"
            >
              Login
            </Link>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          className="public-navigation-mobile-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <motion.div
        className={`public-navigation-mobile-menu ${mobileMenuOpen ? 'open' : 'closed'}`}
        initial={false}
      >
        <div className="public-navigation-mobile-menu-content">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`public-navigation-mobile-link ${isActive(link.path) ? 'active' : ''}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          {isAuthenticated ? (
            <Link
              to="/dashboard"
              className="public-navigation-mobile-link"
              onClick={() => setMobileMenuOpen(false)}
            >
              Dashboard
            </Link>
          ) : (
            <Link
              to="/login"
              className="public-navigation-mobile-link"
              onClick={() => setMobileMenuOpen(false)}
            >
              Login
            </Link>
          )}
        </div>
      </motion.div>
    </nav>
  );
};

export default PublicNav;
