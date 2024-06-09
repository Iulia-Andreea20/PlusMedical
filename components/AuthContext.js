import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({ firstName: null, lastName: null, email: null });
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false); // Set loading to false after checking localStorage
  }, []);

  const login = (userData) => {
    console.log('Logging in user:', userData);
    const userObject = { firstName: userData.firstName, lastName: userData.lastName, email: userData.email };

    const storedUser = localStorage.getItem('user');
    if (!storedUser || JSON.stringify(userObject) !== storedUser) {
      setUser(userObject);
      localStorage.setItem('user', JSON.stringify(userObject));
    }
  };

  const logout = () => {
    console.log('Logging out user');
    router.replace('/');


    setTimeout(() => {
        localStorage.removeItem('user');
        setUser({ firstName: null, lastName: null, email: null });
    }, 100);

  };

  console.log('Current user:', user);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
