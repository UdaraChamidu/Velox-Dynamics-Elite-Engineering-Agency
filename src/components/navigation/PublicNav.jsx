import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X, Zap, Search } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import SearchBar from '../ui/SearchBar';
import ThemeToggle from '../ui/ThemeToggle';

const PublicNav = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'Blog', path: '/blog' },
    { name: 'Case Studies', path: '/case-studies' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'Budget Calculator', path: '/budget-calculator' },
    { name: 'ROI Calculator', path: '/roi-calculator' },
    { name: 'Timeline', path: '/timeline-estimator' },
    { name: 'FAQ', path: '/faq' },
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
          
          {/* Search Button */}
          <button
            onClick={() => setSearchOpen(true)}
            className="public-navigation-link flex items-center gap-1"
            aria-label="Search"
          >
            <Search className="w-4 h-4" />
            Search
          </button>

          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Contact button */}
          <Link
            to="/contact"
            className="px-6 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity"
          >
            Contact
          </Link>

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
          <button
            onClick={() => { setMobileMenuOpen(false); setSearchOpen(true); }}
            className="public-navigation-mobile-link flex items-center gap-2"
          >
            <Search className="w-4 h-4" />
            Search
          </button>
          <Link
            to="/contact"
            className="public-navigation-mobile-link font-semibold text-primary"
            onClick={() => setMobileMenuOpen(false)}
          >
            Contact Us
          </Link>
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

      {/* Search Modal */}
      {searchOpen && (
        <div 
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-start justify-center pt-24 px-6"
          onClick={() => setSearchOpen(false)}
        >
          <div onClick={(e) => e.stopPropagation()}>
            <SearchBar onClose={() => setSearchOpen(false)} />
          </div>
        </div>
      )}
    </nav>
  );
};

export default PublicNav;
