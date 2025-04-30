import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/Login.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Simulate API call with timeout
    setTimeout(() => {
      // Dummy logic
      if (username === "donor") {
        navigate("/donor-dashboard");
      } else if (username === "volunteer") {
        navigate("/volunteer-dashboard");
      } else {
        setError("Invalid username or password. Try 'donor' or 'volunteer'");
      }
      setIsLoading(false);
    }, 1000);
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <div className="login-logo">
            <span className="login-logo-icon">🤝</span>
            <h2>KindShare</h2>
          </div>
          <h3>Welcome Back</h3>
          <p>Sign in to continue your mission of sharing kindness</p>
        </div>

        {error && (
          <div className="error-message">
            <span className="error-icon">⚠️</span>
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <div className="input-container">
              <span className="input-icon">👤</span>
              <input 
                id="username"
                placeholder="Enter your username" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
                required 
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="input-container">
              <span className="input-icon">🔒</span>
              <input 
                id="password"
                type={passwordVisible ? "text" : "password"} 
                placeholder="Enter your password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
              />
              <button 
                type="button" 
                className="toggle-password" 
                onClick={togglePasswordVisibility}
              >
                {passwordVisible ? "👁️" : "👁️‍🗨️"}
              </button>
            </div>
          </div>

          <div className="form-options">
            <div className="remember-me">
              <input 
                type="checkbox" 
                id="remember" 
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
              />
              <label htmlFor="remember">Remember me</label>
            </div>
            <Link to="/forgot-password" className="forgot-password">
              Forgot password?
            </Link>
          </div>

          <button 
            type="submit" 
            className={`login-button ${isLoading ? 'loading' : ''}`}
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="spinner"></span>
            ) : (
              'Login'
            )}
          </button>
        </form>

        <div className="login-footer">
          <p>Don't have an account?</p>
          <Link to="/register" className="register-link">
            Create Account
          </Link>
        </div>

        <div className="login-demo-info">
          <p>Demo Logins:</p>
          <div className="demo-credentials">
            <div className="demo-user">
              <span>Username: donor</span>
              <span>Password: any</span>
            </div>
            <div className="demo-user">
              <span>Username: volunteer</span>
              <span>Password: any</span>
            </div>
          </div>
        </div>
      </div>

      <div className="login-background">
        <div className="login-background-content">
          <h2>Making a Difference One Meal at a Time</h2>
          <p>Join our community of donors and volunteers working together to reduce food waste and fight hunger.</p>
        </div>
      </div>
    </div>
  );
}

export default Login;