import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar({ user }) {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState(location.pathname);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Update active link when location changes
  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location.pathname]);

  const handleLinkClick = (path) => {
    setActiveLink(path);
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="logo-container" onClick={() => handleLinkClick("/")}>
          <div className="logo-icon">🤝</div>
          <h2 className="logo">KindShare</h2>
        </Link>

        <div className="hamburger" onClick={toggleMobileMenu}>
          <div className={`hamburger-line ${isMobileMenuOpen ? 'open' : ''}`}></div>
          <div className={`hamburger-line ${isMobileMenuOpen ? 'open' : ''}`}></div>
          <div className={`hamburger-line ${isMobileMenuOpen ? 'open' : ''}`}></div>
        </div>

        <ul className={`nav-links ${isMobileMenuOpen ? 'active' : ''}`}>
          <li>
            <Link 
              to="/" 
              className={activeLink === "/" ? "active" : ""} 
              onClick={() => handleLinkClick("/")}
            >
              Home
              <span className="link-hover-effect"></span>
            </Link>
          </li>
          
          <li>
            <Link 
              to="/gallery" 
              className={activeLink === "/gallery" ? "active" : ""} 
              onClick={() => handleLinkClick("/gallery")}
            >
              Gallery
              <span className="link-hover-effect"></span>
            </Link>
          </li>
          
          {/* Conditional navigation based on authentication */}
          {user ? (
            // Show these links when user is logged in
            <>
              <li>
                <Link 
                  to={user.role === 'donor' ? "/donor-dashboard" : "/volunteer-dashboard"} 
                  className={activeLink === "/donor-dashboard" || activeLink === "/volunteer-dashboard" ? "active" : ""} 
                  onClick={() => handleLinkClick(user.role === 'donor' ? "/donor-dashboard" : "/volunteer-dashboard")}
                >
                  Dashboard
                  <span className="link-hover-effect"></span>
                </Link>
              </li>
              <li>
                <Link 
                  to="/logout" 
                  className={activeLink === "/logout" ? "active" : ""} 
                  onClick={() => handleLinkClick("/logout")}
                >
                  Logout
                  <span className="link-hover-effect"></span>
                </Link>
              </li>
              {/* User profile indicator */}
              <li className="user-profile-indicator">
                <span className="username-display">
                  {user.fullName || user.username}
                </span>
              </li>
            </>
          ) : (
            // Show these links when user is NOT logged in
            <>
              <li>
                <Link 
                  to="/login" 
                  className={activeLink === "/login" ? "active" : ""} 
                  onClick={() => handleLinkClick("/login")}
                >
                  Login
                  <span className="link-hover-effect"></span>
                </Link>
              </li>
              <li>
                <Link 
                  to="/register" 
                  className={activeLink === "/register" ? "active" : ""} 
                  onClick={() => handleLinkClick("/register")}
                >
                  Register
                  <span className="link-hover-effect"></span>
                </Link>
              </li>
              <li className="donate-button-container">
                <Link 
                  to="/register" 
                  className="donate-button" 
                  onClick={() => handleLinkClick("/register")}
                >
                  Donate Now
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;