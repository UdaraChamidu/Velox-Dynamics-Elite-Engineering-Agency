import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Search, ChevronDown } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import SearchBar from '../ui/SearchBar';
import ThemeToggle from '../ui/ThemeToggle';

const PublicNav = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [toolsDropdownOpen, setToolsDropdownOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'Case Studies', path: '/case-studies' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'Blog', path: '/blog' },
    { name: 'Team', path: '/team' },
    { name: 'FAQ', path: '/faq' },
  ];

  const toolsLinks = [
    { name: 'Budget Calculator', path: '/budget-calculator', description: 'Estimate project costs' },
    { name: 'ROI Calculator', path: '/roi-calculator', description: 'Calculate return on investment' },
    { name: 'Timeline Estimator', path: '/timeline-estimator', description: 'Project duration estimate' },
  ];

  const isActive = (path) => location.pathname === path;
  const isToolsActive = toolsLinks.some(tool => location.pathname === tool.path);

  return (
    <nav className="public-navigation">
      <div className="public-navigation-container">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <img 
            src="/logo-192.png" 
            alt="Velox Dynamics Logo" 
            className="h-10 w-auto transition-all duration-250 hover:scale-105"
          />
          <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600 hidden sm:block">
            Velox Dynamics
          </span>
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
          
          {/* Tools Dropdown */}
          <div 
            className="relative"
            onMouseEnter={() => setToolsDropdownOpen(true)}
            onMouseLeave={() => setToolsDropdownOpen(false)}
          >
            <button
              className={`public-navigation-link flex items-center gap-1 ${isToolsActive ? 'active' : ''}`}
              aria-label="Tools menu"
              aria-expanded={toolsDropdownOpen}
            >
              Tools
              <ChevronDown className={`w-4 h-4 transition-transform ${toolsDropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {toolsDropdownOpen && (
              <div className="absolute top-full left-0 mt-2 w-64 bg-card border border-border rounded-lg shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-2">
                {toolsLinks.map((tool) => (
                  <Link
                    key={tool.path}
                    to={tool.path}
                    className="block px-4 py-3 hover:bg-muted transition-colors"
                  >
                    <div className="font-medium text-foreground">{tool.name}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">{tool.description}</div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={() => setSearchOpen(true)}
            className="public-navigation-link p-2"
            aria-label="Search"
          >
            <Search className="w-5 h-5" />
          </button>

          <ThemeToggle />

          <Link to="/contact">
            <button className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:glow-md transition-all font-medium">
              Contact
            </button>
          </Link>
          
          {isAuthenticated ? (
            <Link to="/dashboard">
              <button className="px-5 py-2 border border-primary text-primary hover:bg-primary hover:text-primary-foreground rounded-lg transition-all font-medium">
                Dashboard
              </button>
            </Link>
          ) : (
            <Link to="/login">
              <button className="px-5 py-2 border border-primary text-primary hover:bg-primary hover:text-primary-foreground rounded-lg transition-all font-medium">
                Login
              </button>
            </Link>
          )}

          
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="lg:hidden p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-[1000] bg-card lg:hidden">
            <div className="flex flex-col h-full p-6 pt-20">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`py-3 border-b border-border text-lg font-medium ${isActive(link.path) ? 'text-primary' : 'text-foreground'}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              
              {/* Tools Section in Mobile */}
              <div className="border-t border-border pt-4 mt-4">
                <p className="text-sm font-semibold text-muted-foreground mb-2">Tools</p>
                {toolsLinks.map((tool) => (
                  <Link
                    key={tool.path}
                    to={tool.path}
                    className={`block py-3 text-lg ${isActive(tool.path) ? 'text-primary' : 'text-foreground'}`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {tool.name}
                  </Link>
                ))}
              </div>

              <Link to="/contact" className="mt-6" onClick={() => setMobileMenuOpen(false)}>
                <button className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium">
                  Contact Us
                </button>
              </Link>
              
              {isAuthenticated ? (
                <Link to="/dashboard" className="mt-4" onClick={() => setMobileMenuOpen(false)}>
                  <button className="w-full px-6 py-3 border border-primary text-primary rounded-lg font-medium">
                    Dashboard
                  </button>
                </Link>
              ) : (
                <Link to="/auth" className="mt-4" onClick={() => setMobileMenuOpen(false)}>
                  <button className="w-full px-6 py-3 border border-primary text-primary rounded-lg font-medium">
                    Login
                  </button>
                </Link>
              )}
            </div>

            {/* Close button */}
            <button
              className="absolute top-4 right-4 p-2"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        )}

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
      </div>
    </nav>
  );
};

export default PublicNav;
