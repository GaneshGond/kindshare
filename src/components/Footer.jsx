import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Footer.css";

function Footer() {
  const [emailInput, setEmailInput] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (emailInput.trim() !== "") {
      setIsSubmitted(true);
      setEmailInput("");
      setTimeout(() => setIsSubmitted(false), 3000);
    }
  };

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section about">
          <div className="footer-logo">
            <span className="logo-icon">🤝</span>
            <h3>KindShare</h3>
          </div>
          <p>Connecting surplus food with those who need it most. Join our mission to reduce food waste and fight hunger in our communities.</p>
          <div className="social-icons">
            <a href="#" className="social-icon">
              <i className="fab fa-facebook">📘</i>
            </a>
            <a href="#" className="social-icon">
              <i className="fab fa-twitter">🐦</i>
            </a>
            <a href="#" className="social-icon">
              <i className="fab fa-instagram">📷</i>
            </a>
            <a href="#" className="social-icon">
              <i className="fab fa-linkedin">💼</i>
            </a>
          </div>
        </div>
        
        <div className="footer-section links">
          <h3>Quick Links</h3>
          <ul>
          <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/register">Register</Link></li>
              <li><Link to="/gallery">Gallery</Link></li>
            </ul>

          </ul>
        </div>
        
        <div className="footer-section newsletter">
          <h3>Stay Updated</h3>
          <p>Subscribe to our newsletter for updates on events and opportunities.</p>
          <form onSubmit={handleSubmit} className="newsletter-form">
            <div className="input-group">
              <input 
                type="email" 
                placeholder="Your email address" 
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                required
              />
              <button type="submit" className={`subscribe-btn ${isSubmitted ? 'submitted' : ''}`}>
                {isSubmitted ? '✓' : 'Subscribe'}
              </button>
            </div>
            {isSubmitted && <p className="success-message">Thank you for subscribing!</p>}
          </form>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} KindShare. All rights reserved.</p>
        <div className="footer-bottom-links">
          <Link to="/privacy">Privacy Policy</Link>
          <Link to="/terms">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;