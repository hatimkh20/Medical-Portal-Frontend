// App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import AuthProvider, { AuthContext } from "./context/AuthContext";
import Navbar from "./components/Navigation/Navbar";
import Dashboard from "./pages/Dashboard";
import MultiStepForm from "./components/User Components/MultiStepForm/MultiStepForm"; // Import the MultiStepForm component
import Steps from "./components/User Components/MultiStepForm/Steps";

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
          {/* <Route path="/" element={<HomePage />} /> */}
          <Route path="/" element={<MultiStepForm steps={Steps}/>} />
          <Route path="/sign-in" element={<AuthPage />} />
          <Route path="/sign-up" element={<AuthPage />} />
          <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
          <Route path="/form" element={ <MultiStepForm steps={Steps}/>} />
           {/* Add route for MultiStepForm */}
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
