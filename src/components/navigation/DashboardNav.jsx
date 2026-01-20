import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Menu, 
  X, 
  Zap, 
  LayoutDashboard, 
  FileText, 
  Bell, 
  Settings, 
  Users, 
  Inbox,
  LogOut,
  MessageSquare,
  Calendar,
  CreditCard
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import NotificationBell from '../ui/NotificationBell';

const DashboardNav = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser, isAdmin, logout } = useAuth();

  const userLinks = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'My Requests', path: '/dashboard/my-requests', icon: FileText },
    { name: 'Messages', path: '/dashboard/messages', icon: MessageSquare },
    { name: 'Calendar', path: '/dashboard/calendar', icon: Calendar },
    { name: 'Payment', path: '/dashboard/payment', icon: CreditCard },
    { name: 'Notifications', path: '/dashboard/notifications', icon: Bell },
    { name: 'Settings', path: '/dashboard/settings', icon: Settings },
  ];

  const adminLinks = [
    { name: 'Admin Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'User Management', path: '/admin/users', icon: Users },
    { name: 'Request Hub', path: '/admin/requests', icon: Inbox },
  ];

  const links = isAdmin ? [...adminLinks, ...userLinks] : userLinks;
  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <aside className={`dashboard-sidebar ${sidebarOpen ? 'expanded' : 'collapsed'} lg:expanded`}>
        {/* Logo */}
        <div className="dashboard-sidebar-header">
          <Link to="/">
            <img 
              src="/logo.png" 
              alt="Velox Dynamics" 
              className="h-14 w-auto hover:scale-105 transition-all duration-250"
            />
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="dashboard-sidebar-nav">
          {links.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`dashboard-sidebar-link ${isActive(link.path) ? 'active' : ''}`}
                onClick={() => setSidebarOpen(false)}
              >
                <Icon className="w-5 h-5" />
                <span>{link.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer - Logout */}
        <div className="dashboard-sidebar-footer">
          <button
            onClick={handleLogout}
            className="dashboard-sidebar-link w-full text-left"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Mobile Toggle */}
      <button
        className="dashboard-mobile-toggle"
        onClick={() => setSidebarOpen(!sidebarOpen)}
        aria-label="Toggle sidebar"
      >
        {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Main Content */}
      <main className="lg:pl-[240px] min-h-screen">
        {/* Top Bar */}
        <div className="bg-card border-b border-border px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-foreground">
              Welcome, {currentUser?.name}
            </h2>
            <p className="text-sm text-muted-foreground">
              {isAdmin ? 'Admin' : 'Client'} Dashboard
            </p>
          </div>
          <div className="flex items-center gap-4">
            <NotificationBell />
          </div>
        </div>

        {/* Page Content */}
        <div className="p-6">
          {children}
        </div>
      </main>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-[90] lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default DashboardNav;
