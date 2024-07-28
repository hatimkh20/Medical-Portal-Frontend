// components/Auth/ForgotPassword.js

import React, { useContext } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { AuthContext } from '../../context/AuthContext';
import './Auth.css';
import authenticationImage from '../../assets/images/authentication.png'; // Ensure this path is correct
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
  const { forgotPassword } = useContext(AuthContext);

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
    }),
    onSubmit: async (values) => {
      await forgotPassword(values.email);
      alert('Password reset email sent');
    },
  });

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-form-container">
          <form className="login-form" onSubmit={formik.handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="error">{formik.errors.email}</div>
              ) : null}
            </div>
            <button type="submit" className="btn btn-primary">
              Send Reset Link
            </button>
          </form>
          <p className="login-footer">
            Remembered your password? <Link to="/login">Sign In</Link>
          </p>
        </div>
        <div
          className="login-info"
          style={{
            backgroundImage: `url(${authenticationImage})`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
          }}
        >
          <h2>Forgot Your Password?</h2>
          <p>Enter your email to receive a password reset link.</p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
