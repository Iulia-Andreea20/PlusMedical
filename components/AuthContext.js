import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({ firstName: null, lastName: null, email: null });

  useEffect(() => {
    // Load user data from local storage when the component mounts
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (userData) => {
    console.log('Logging in user:', userData);
    const userObject = { firstName: userData.firstName, lastName: userData.lastName, email: userData.email };
    setUser(userObject);
    localStorage.setItem('user', JSON.stringify(userObject));
  };

  const logout = () => {
    console.log('Logging out user');
    setUser({ firstName: null, lastName: null, email: null });
    localStorage.removeItem('user');
  };

  console.log('Current user:', user);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
