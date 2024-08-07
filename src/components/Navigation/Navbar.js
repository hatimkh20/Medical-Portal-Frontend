import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./Navbar.css";
import logoImage from "../../assets/images/logo.png";

const Navbar = () => {
  const { isLoggedIn, logout } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="container">
      <div className="navbar">
        <div className="navbar-logo">
          <Link to="/">
            <img
              src={logoImage}
              alt="Doreen Medicals Limited"
              className="navbar-logo-image"
            />
          </Link>
        </div>
        <ul className={`navbar-links ${isMenuOpen ? "active" : ""}`}>
          <li>
            <Link to="/" onClick={toggleMenu}>Home</Link>
          </li>
          <li>
            <Link to="/about" onClick={toggleMenu}>About</Link>
          </li>
          <li>
            <Link to="/contact" onClick={toggleMenu}>Contact</Link>
          </li>
          <li>
            <Link to="/services" onClick={toggleMenu}>Services</Link>
          </li>
          {isLoggedIn ? (
            <>
              <li>
                <Link to="/dashboard" onClick={toggleMenu}>Dashboard</Link>
              </li>
              <li>
                <Link to="/wallet" onClick={toggleMenu}>Wallet</Link>
              </li>
              <li>
                <button onClick={() => { logout(); toggleMenu(); }} className="btn-logout">
                  Logout
                </button>
              </li>
            </>
          ) : (
            <li>
              <Link to="/sign-in" onClick={toggleMenu}>Login</Link>
            </li>
          )}
        </ul>
        <div className="hamburger" onClick={toggleMenu}>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
