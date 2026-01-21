import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

const MOCK_USERS = [
  {
    id: 'admin-1',
    email: 'admin@velox.com',
    password: 'admin123',
    role: 'admin',
    name: 'Admin User',
    avatar: null
  },
  {
    id: 'client-1',
    email: 'client@velox.com',
    password: 'client123',
    role: 'client',
    name: 'Client User',
    avatar: null
  }
];

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState(MOCK_USERS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for stored session
    const storedUser = localStorage.getItem('velox_user');
    if (storedUser) {
      try {
        setCurrentUser(JSON.parse(storedUser));
      } catch (e) {
        localStorage.removeItem('velox_user');
      }
    }

    // Load users from storage
    const storedUsers = localStorage.getItem('velox_users');
    if (storedUsers) {
      try {
        setUsers(JSON.parse(storedUsers));
      } catch (e) {
        // If error parsing, keep mock users but don't crash
        console.error('Failed to parse stored users', e);
      }
    }

    setLoading(false);
  }, []);

  const login = (email, password) => {
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      const { password: _, ...userWithoutPassword } = user;
      setCurrentUser(userWithoutPassword);
      localStorage.setItem('velox_user', JSON.stringify(userWithoutPassword));
      return { success: true, user: userWithoutPassword };
    }
    return { success: false, error: 'Invalid credentials' };
  };

  const register = (email, password, name) => {
    // Check if user already exists
    if (users.find(u => u.email === email)) {
      return { success: false, error: 'User already exists' };
    }

    const newUser = {
      id: `user-${Date.now()}`,
      email,
      password,
      role: 'client',
      name,
      avatar: null
    };

    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    localStorage.setItem('velox_users', JSON.stringify(updatedUsers));

    const { password: _, ...userWithoutPassword } = newUser;
    setCurrentUser(userWithoutPassword);
    localStorage.setItem('velox_user', JSON.stringify(userWithoutPassword));

    return { success: true, user: userWithoutPassword };
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('velox_user');
  };

  const updateProfile = (updates) => {
    if (!currentUser) return { success: false };

    const updatedUser = { ...currentUser, ...updates };
    setCurrentUser(updatedUser);
    localStorage.setItem('velox_user', JSON.stringify(updatedUser));

    // Update in users array
    const updatedUsers = users.map(u => 
      u.id === currentUser.id ? { ...u, ...updates } : u
    );
    setUsers(updatedUsers);
    localStorage.setItem('velox_users', JSON.stringify(updatedUsers));

    return { success: true, user: updatedUser };
  };

  const value = {
    currentUser,
    users,
    login,
    register,
    logout,
    updateProfile,
    isAdmin: currentUser?.role === 'admin',
    isClient: currentUser?.role === 'client',
    isAuthenticated: !!currentUser,
    loading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
