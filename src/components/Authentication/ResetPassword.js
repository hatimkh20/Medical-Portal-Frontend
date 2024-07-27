// components/Auth/ResetPassword.js

import React, { useContext } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { AuthContext } from '../../context/AuthContext';
import authenticationImage from "../../assets/images/authentication.png";
import './Auth.css';
import { useParams, useNavigate } from 'react-router-dom';

const ResetPassword = () => {
  const { resetPassword } = useContext(AuthContext);
  const { token } = useParams();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      password: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      password: Yup.string().required('Password is required'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Confirm password is required'),
    }),
    onSubmit: async (values) => {
      try {
        await resetPassword(token, values.password);
        alert('Password reset successfully');
        navigate('/login');
      } catch (error) {
        alert('Failed to reset password');
      }
    },
  });

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-form-container">
          <form className="login-form" onSubmit={formik.handleSubmit}>
            <div className="form-group">
              <label htmlFor="password">New Password</label>
              <input
                type="password"
                id="password"
                name="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />
              {formik.touched.password && formik.errors.password ? (
                <div className="error">{formik.errors.password}</div>
              ) : null}
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.confirmPassword}
              />
              {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                <div className="error">{formik.errors.confirmPassword}</div>
              ) : null}
            </div>
            <button type="submit" className="btn btn-primary">
              Reset Password
            </button>
          </form>
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
          <h2>Reset Your Password</h2>
          <p>Enter your new password to reset it.</p>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
