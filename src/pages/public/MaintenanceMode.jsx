import React from 'react';
import { Construction, Home, Mail, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const MaintenanceMode = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="max-w-2xl w-full text-center">
        {/* Logo */}
        <div className="mb-8">
          <img 
            src="/logo.png" 
            alt="Velox Dynamics" 
            className="h-16 w-auto mx-auto"
          />
        </div>

        {/* Icon */}
        <div className="mb-8">
          <div className="w-32 h-32 mx-auto rounded-full bg-yellow-500/20 flex items-center justify-center">
            <Construction className="w-16 h-16 text-yellow-400" />
          </div>
        </div>

        {/* Content */}
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          We'll Be Right Back
        </h1>
        <p className="text-xl text-muted-foreground mb-8">
          Our website is currently undergoing scheduled maintenance to serve you better.
        </p>

        {/* Info Cards */}
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          <div className="p-6 bg-card border border-border rounded-lg">
            <h3 className="font-semibold mb-2">Estimated Downtime</h3>
            <p className="text-muted-foreground text-sm">
              We expect to be back online within 2-3 hours
            </p>
          </div>
          <div className="p-6 bg-card border border-border rounded-lg">
            <h3 className="font-semibold mb-2">Need Immediate Help?</h3>
            <p className="text-muted-foreground text-sm">
              Contact us at support@veloxdynamics.com
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity"
          >
            <Home className="w-5 h-5" />
            Return Home
          </Link>
          <a
            href="mailto:support@veloxdynamics.com"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-card border border-border rounded-lg font-semibold hover:border-primary transition-colors"
          >
            <Mail className="w-5 h-5" />
            Contact Support
          </a>
        </div>

        {/* Footer */}
        <div className="mt-12 pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground">
            Thank you for your patience. We're working hard to improve your experience.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MaintenanceMode;
