// context/AuthContext.js

import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { BASE_URL } from '../constant';
import { toast } from "react-toastify";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedUser = jwtDecode(token);
        console.log(decodedUser, "user");
        setUser(decodedUser);
        setIsLoggedIn(true);
      } catch (error) {
        console.error("Token decoding error: ", error);
        toast.error("Your session is invalid. Please log in again.");
        setIsLoggedIn(false);
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post(BASE_URL + "/api/auth/login", { email, password });
      const { access_token } = response.data.data;
      localStorage.setItem("token", access_token);
      const decodedUser = jwtDecode(access_token);
      setUser(decodedUser);
      setIsLoggedIn(true);
      toast.success("You have successfully logged in.");
    } catch (error) {
      console.error("Login error:", error);
      toast.error(error.response?.data?.message || "Login failed. Please check your credentials and try again.");
      setIsLoggedIn(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setIsLoggedIn(false);
    toast.info("You have been logged out.");
  };

  const forgotPassword = async (email) => {
    try {
      await axios.post(BASE_URL + '/api/auth/forgot-password', { email });
      toast.success("If an account exists with this email, you will receive password reset instructions.");
    } catch (error) {
      console.error('Forgot password error:', error);
      toast.error("An error occurred while processing your request. Please try again.");
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
      toast.error("Invalid or expired reset token. Please request a new password reset.");
      throw error;
    }
  };

  const resetPassword = async (token, password) => {
    try {
      await axios.post(BASE_URL + '/api/auth/reset-password', { password }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Your password has been successfully reset. You can now log in with your new password.");
    } catch (error) {
      console.error('Reset password error:', error);
      toast.error("Failed to reset password. Please try again.");
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, loading, login, logout, forgotPassword, verifyResetPassword, resetPassword, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
