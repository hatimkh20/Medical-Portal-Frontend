// context/AuthContext.js

import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import  {jwtDecode} from 'jwt-decode';
import { BASE_URL } from '../constant';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true); // Add loading state
  const [user, setUser] = useState(null); // Add user state

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedUser = jwtDecode(token); // Decode the token to get user info
      console.log(decodedUser, "user")
      setUser(decodedUser);
      setIsLoggedIn(true);
    }
    setLoading(false); // Set loading to false after checking token
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post(BASE_URL + '/api/auth/login', { email, password });
      const { access_token } = response.data.data;
      localStorage.setItem('token', access_token);
      setIsLoggedIn(true);
    } catch (error) {
      console.error('Login error:', error);
      setIsLoggedIn(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  const forgotPassword = async (email) => {
    try {
      await axios.post(BASE_URL + '/api/auth/forgot-password', { email });
    } catch (error) {
      console.error('Forgot password error:', error);
    }
  };

  const verifyResetPassword = async (token) => {
    try {
      const response = await axios.get(BASE_URL + '/api/auth/reset-password', {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      console.error('Verify reset password error:', error);
      throw error;
    }
  };

  const resetPassword = async (token, password) => {
    try {
      await axios.post(BASE_URL + '/api/auth/reset-password', { password }, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (error) {
      console.error('Reset password error:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, loading, login, logout, forgotPassword, verifyResetPassword, resetPassword }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
