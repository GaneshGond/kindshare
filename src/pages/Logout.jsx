import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Logout.css";

function Logout({ onLogout }) {
  const [countdown, setCountdown] = useState(3);
  const navigate = useNavigate();

  useEffect(() => {
    // Immediately perform the logout action
    onLogout();
    
    // Set up countdown for redirect
    const timer = setInterval(() => {
      setCountdown((prevCount) => {
        if (prevCount <= 1) {
          clearInterval(timer);
          navigate("/");
          return 0;
        }
        return prevCount - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [onLogout, navigate]);

  return (
    <div className="logout-container">
      <div className="logout-card">
        <div className="logout-icon">👋</div>
        <h2>You've Been Logged Out</h2>
        <p>Thank you for using KindShare. We hope to see you again soon!</p>
        <div className="logout-redirect">
          Redirecting to home page in {countdown} seconds...
        </div>
        <button onClick={() => navigate("/")} className="return-home-button">
          Return to Home Now
        </button>
      </div>
    </div>
  );
}

export default Logout;