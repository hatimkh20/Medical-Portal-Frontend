// components/Auth/VerifyResetPassword.js

import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useParams, useNavigate } from 'react-router-dom';

const VerifyResetPassword = () => {
  const { verifyResetPassword } = useContext(AuthContext);
  const { token } = useParams();
  const navigate = useNavigate();
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    const verifyToken = async () => {
      try {
        await verifyResetPassword(token);
        setVerified(true);
      } catch (error) {
        console.error('Verification failed', error);
        navigate('/error');
      }
    };

    verifyToken();
  }, [token, verifyResetPassword, navigate]);

  return verified ? <p>Token verified. Redirecting...</p> : <p>Verifying...</p>;
};

export default VerifyResetPassword;
