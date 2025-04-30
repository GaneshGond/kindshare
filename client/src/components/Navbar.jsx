import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar() {
  const [activeLink, setActiveLink] = useState(window.location.pathname);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
          <li className="donate-button-container">
            <Link 
              to="/register" 
              className="donate-button" 
              onClick={() => handleLinkClick("/register")}
            >
              Donate Now
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;