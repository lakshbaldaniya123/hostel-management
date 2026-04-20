import React, { createContext, useState, useContext } from 'react';

export const AuthContext = createContext();

/**
 * useAuth — convenience hook
 * Usage: const { currentUser, setCurrentUser, logout } = useAuth();
 */
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    // Check localStorage on initial load
    const savedUser = localStorage.getItem('currentUser');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  /**
   * Call this after a successful backend login.
   * Expects the user object returned from /api/auth/login:
   *   { hostelId, name, role, department, roomNo, ... }
   */
  const login = (userData) => {
    setCurrentUser(userData);
    localStorage.setItem('currentUser', JSON.stringify(userData));
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout, setCurrentUser }}>
      {children}
    </AuthContext.Provider>
  );
};
