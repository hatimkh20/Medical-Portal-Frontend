// App.js
import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import AuthProvider, { AuthContext } from "./context/AuthContext";
import Navbar from "./components/Navigation/Navbar";
import Dashboard from "./pages/Dashboard";
import MultiStepForm from "./components/User Components/MultiStepForm/MultiStepForm"; // Import the MultiStepForm component
import Steps from "./components/User Components/MultiStepForm/Steps";
import MedicalReport from "./components/Report Component/MedicalReport";
import { data } from "./data";
import ForgotPassword from "./components/Authentication/ForgetPassword";
import VerifyResetPassword from "./components/Authentication/VerifyResetPassword";
import ResetPassword from "./components/Authentication/ResetPassword";

function App() {
  const ProtectedRoute = ({ element, ...rest }) => {
    const { isLoggedIn } = useContext(AuthContext);
    return isLoggedIn ? element : <Navigate to="/sign-in" />;
  };
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
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route
            path="/verify-reset-password/:token"
            element={<VerifyResetPassword />}
          />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route
            path="/dashboard"
            element={<ProtectedRoute element={<Dashboard />} />}
          />
          <Route
            path="/form"
            element={<ProtectedRoute element={<MultiStepForm steps={Steps} />} />}
          />
          <Route
            path="/report"
            element={<ProtectedRoute element={<MedicalReport data={data} />} />}
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
