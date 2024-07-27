// components/ProtectedRoute.js

import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ element }) => {
  const { isLoggedIn, loading } = useContext(AuthContext);

  if (loading) {
    return <div>Loading...</div>; // Replace with a spinner or loading component if desired
  }

  return isLoggedIn ? element : <Navigate to="/sign-in" />;
};

export default ProtectedRoute;
