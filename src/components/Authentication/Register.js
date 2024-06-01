import React, { useContext } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { AuthContext } from "../../context/AuthContext";
import "./Auth.css";
import authenticationImage from "../../assets/images/authentication.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      gmcNumber: "",
      signature: "",  // Changed to string
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("First Name is required"),
      lastName: Yup.string().required("Last Name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      gmcNumber: Yup.string().required("GMC Number is required"),
      signature: Yup.string().required("Signature is required"),  // Changed validation to string
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Confirm Password is required"),
    }),
    onSubmit: async (values) => {
      try {
        const response = await axios.post("http://localhost:3001/api/auth/register", {
          first_name: values.firstName,
          last_name: values.lastName,
          email: values.email,
          gmc_number: values.gmcNumber,
          signature: values.signature,  // Send signature as a string
          password: values.password,
        });
        if (response.status === 200 || response.status === 201) {
          alert("Registration successful. Please login.");
          navigate("/sign-in");  // Redirect to login screen upon successful registration
        }
      } catch (error) {
        console.error("There was an error registering!", error);
        alert("Registration failed");
      }
    },
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
                type="text"
                id="signature"
                name="signature"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.signature}
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

            <button type="submit" className="btn btn-primary">
              Register
            </button>
          </form>
          <p className="login-footer">
            Already have an account? <Link to="/sign-in">Login</Link>
          </p>
        </div>
        <div
          className="login-info"
          style={{
            backgroundImage: `url(${authenticationImage})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        >
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

export default Register;
