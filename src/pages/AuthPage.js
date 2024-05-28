import React from 'react';
import { useLocation } from 'react-router-dom';
import Login from '../components/Authentication/Login';
import Register from '../components/Authentication/Register';

const AuthPage = () => {
  const location = useLocation();
  const isSignIn = location.pathname === '/sign-in';

  return (
    <div className="auth-page">
      {isSignIn ? <Login /> : <Register />}
    </div>
  );
};

export default AuthPage;
