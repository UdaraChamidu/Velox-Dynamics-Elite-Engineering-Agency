import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { DataProvider } from './contexts/DataContext';
import { NotificationProvider } from './contexts/NotificationContext';

// Public Pages
import Home from './pages/public/Home';
import Portfolio from './pages/public/Portfolio';
import Team from './pages/public/Team';
import Login from './pages/public/Login';
import Register from './pages/public/Register';
import Contact from './pages/public/Contact';
import Blog from './pages/public/Blog';
import BlogPost from './pages/public/BlogPost';
import Pricing from './pages/public/Pricing';
import FAQ from './pages/public/FAQ';
import CaseStudies from './pages/public/CaseStudies';

// Error Pages
import NotFound from './pages/error/NotFound';

// Dashboard Pages
import UserDashboard from './pages/dashboard/UserDashboard';
import RequestService from './pages/dashboard/RequestService';
import SubmitProposal from './pages/dashboard/SubmitProposal';
import MyRequests from './pages/dashboard/MyRequests';
import Notifications from './pages/dashboard/Notifications';
import Settings from './pages/dashboard/Settings';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import UserManagement from './pages/admin/UserManagement';
import RequestHub from './pages/admin/RequestHub';

// Protected Route Components
const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { currentUser, isAdmin, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-foreground text-xl">Loading...</div>
      </div>
    );
  }

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && !isAdmin) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/portfolio" element={<Portfolio />} />
      <Route path="/team" element={<Team />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/blog/:slug" element={<BlogPost />} />
      <Route path="/case-studies" element={<CaseStudies />} />
      <Route path="/pricing" element={<Pricing />} />
      <Route path="/faq" element={<FAQ />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* User Dashboard Routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <UserDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/request-service"
        element={
          <ProtectedRoute>
            <RequestService />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/submit-proposal"
        element={
          <ProtectedRoute>
            <SubmitProposal />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/my-requests"
        element={
          <ProtectedRoute>
            <MyRequests />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/notifications"
        element={
          <ProtectedRoute>
            <Notifications />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/settings"
        element={
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        }
      />

      {/* Admin Routes */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute adminOnly>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/users"
        element={
          <ProtectedRoute adminOnly>
            <UserManagement />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/requests"
        element={
          <ProtectedRoute adminOnly>
            <RequestHub />
          </ProtectedRoute>
        }
      />

      {/* 404 Page */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <DataProvider>
          <NotificationProvider>
            <AppRoutes />
          </NotificationProvider>
        </DataProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
