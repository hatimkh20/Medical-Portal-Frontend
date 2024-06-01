// App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import AuthProvider, { AuthContext } from "./context/AuthContext";
import Navbar from "./components/Navigation/Navbar";
import Dashboard from "./pages/Dashboard";

const ProtectedRoute = ({ element }) => {
  const { isLoggedIn } = React.useContext(AuthContext);
  return isLoggedIn ? element : <Navigate to="/sign-in" />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div>
          <Navbar />
        </div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/sign-in" element={<AuthPage />} />
          <Route path="/sign-up" element={<AuthPage />} />
          <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
          {/* Add other routes here */}
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
