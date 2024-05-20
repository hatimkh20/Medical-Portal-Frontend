import React, { useContext } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { AuthContext } from '../../context/AuthContext';
import './Login.css';

const Login = () => {
  const { login } = useContext(AuthContext);

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      gmcNumber: '',
      signature: null,
      password: '',
      confirmPassword: ''
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required('First Name is required'),
      lastName: Yup.string().required('Last Name is required'),
      email: Yup.string().email('Invalid email address').required('Email is required'),
      gmcNumber: Yup.string().required('GMC Number is required'),
      signature: Yup.mixed().required('Signature is required'),
      password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Confirm Password is required')
    }),
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
      login();
    }
  });

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-form-container">
          <form className="login-form" onSubmit={formik.handleSubmit}>
            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.firstName}
              />
              {formik.touched.firstName && formik.errors.firstName ? (
                <div className="error">{formik.errors.firstName}</div>
              ) : null}
            </div>

            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.lastName}
              />
              {formik.touched.lastName && formik.errors.lastName ? (
                <div className="error">{formik.errors.lastName}</div>
              ) : null}
            </div>

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

            <div className="form-group">
              <label htmlFor="gmcNumber">GMC Number</label>
              <input
                type="text"
                id="gmcNumber"
                name="gmcNumber"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.gmcNumber}
              />
              {formik.touched.gmcNumber && formik.errors.gmcNumber ? (
                <div className="error">{formik.errors.gmcNumber}</div>
              ) : null}
            </div>

            <div className="form-group">
              <label htmlFor="signature">Signature</label>
              <input
                type="file"
                id="signature"
                name="signature"
                onChange={(event) => {
                  formik.setFieldValue("signature", event.currentTarget.files[0]);
                }}
                onBlur={formik.handleBlur}
              />
              {formik.touched.signature && formik.errors.signature ? (
                <div className="error">{formik.errors.signature}</div>
              ) : null}
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
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

            <button type="submit" className="btn btn-primary">Register</button>
          </form>
          <p className="login-footer">Already have an account? <a href="#">Login</a></p>
        </div>
        <div className="login-info">
          <h2>Join Us Today!</h2>
          <p>
            Welcome to Doreen Medicals Limited! Signing up is quick and easy.
            Begin your journey towards simplified report generation by creating
            your account below.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
