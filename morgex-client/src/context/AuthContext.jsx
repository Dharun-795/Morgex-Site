import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();
const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:5001/api';

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check local storage for token
    const token = localStorage.getItem('morgex_token');
    const savedUser = localStorage.getItem('morgex_user');
    
    try {
      if (token && savedUser && savedUser !== "undefined") {
        setCurrentUser(JSON.parse(savedUser));
      }
    } catch (err) {
      console.error("Corrupted auth data in localStorage:", err);
      localStorage.removeItem('morgex_token');
      localStorage.removeItem('morgex_user');
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    
    const data = await res.json();
    console.log('Login Response:', data);
    if (!res.ok) {
      console.error('Login Error Data:', data);
      throw new Error(data.message || 'Login failed');
    }
    
    localStorage.setItem('morgex_token', data.token);
    localStorage.setItem('morgex_user', JSON.stringify(data.user));
    setCurrentUser(data.user);
    return data;
  };

  const register = async (username, email, password) => {
    const res = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password }),
    });

    // Check if the response is actually JSON before parsing
    const contentType = res.headers.get('content-type');
    let data;
    if (contentType && contentType.includes('application/json')) {
      data = await res.json();
    } else {
      const text = await res.text();
      console.error('Server returned non-JSON response:', text);
      throw new Error(`Server Response: ${res.status}. Check backend logs.`);
    }

    console.log('Register Response:', data);
    if (!res.ok) {
      console.error('Register Error Data:', data);
      throw new Error(data.message || 'Registration failed');
    }
    
    localStorage.setItem('morgex_token', data.token);
    localStorage.setItem('morgex_user', JSON.stringify(data.user));
    setCurrentUser(data.user);
    return data;
  };

  const getToken = () => localStorage.getItem('morgex_token');

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('morgex_token');
    localStorage.removeItem('morgex_user');
  };

  const value = {
    currentUser,
    login,
    register,
    logout,
    getToken
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
