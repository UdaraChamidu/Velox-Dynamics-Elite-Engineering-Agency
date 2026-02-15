import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Github, Linkedin, Twitter } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' },
  ];

  const serviceLinks = [
    { name: 'AI & Machine Learning', path: '/contact' },
    { name: 'Computer Vision', path: '/contact' },
    { name: 'N8N Automation', path: '/contact' },
    { name: 'Full-Stack Dev', path: '/contact' },
  ];

  return (
    <footer className="relative z-10 border-t border-border bg-card/50">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-4">
              <img
                src="/logo-192.png"
                alt="Velox Dynamics"
                className="h-10 w-auto"
              />
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
                Velox Dynamics
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Elite AI, Computer Vision, and Automation solutions. Engineering speed. Mastering intelligence.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wider">
              Services
            </h4>
            <ul className="space-y-2">
              {serviceLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wider">
              Connect
            </h4>
            <div className="flex gap-3 mb-4">
              <a
                href="mailto:contact@veloxdynamics.com"
                className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
            </div>
            <a
              href="mailto:contact@veloxdynamics.com"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              contact@veloxdynamics.com
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {currentYear} Velox Dynamics. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link to="/faq" className="text-xs text-muted-foreground hover:text-primary transition-colors">
              FAQ
            </Link>
            <Link to="/case-studies" className="text-xs text-muted-foreground hover:text-primary transition-colors">
              Case Studies
            </Link>
            <Link to="/team" className="text-xs text-muted-foreground hover:text-primary transition-colors">
              The Team
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
