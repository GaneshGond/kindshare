import React, { useState } from "react";
import "../styles/Home.css";

function Home() {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div className="home">
      <div className="hero-section">
        <h1 className="animated-title">Welcome to KindShare</h1>
        <p className="tagline">Donate surplus food and make a difference!</p>
        
        <div className="cta-container">
          <button 
            className={`cta-button ${isHovered ? 'pulse' : ''}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            Start Donating
          </button>
          <button className="learn-more-button">Learn More</button>
        </div>
      </div>
      
      <div className="features-section">
        <div className="feature-card">
          <div className="feature-icon">🍎</div>
          <h3>Reduce Food Waste</h3>
          <p>Share your surplus food with those who need it most</p>
        </div>
        
        <div className="feature-card">
          <div className="feature-icon">🤝</div>
          <h3>Help Communities</h3>
          <p>Connect with local organizations fighting hunger</p>
        </div>
        
        <div className="feature-card">
          <div className="feature-icon">🌍</div>
          <h3>Environmental Impact</h3>
          <p>Reduce your carbon footprint by preventing food waste</p>
        </div>
      </div>
      
      <div className="impact-section">
        <h2>Our Impact</h2>
        <div className="stats-container">
          <div className="stat-item">
            <span className="stat-number">5,000+</span>
            <span className="stat-label">Meals Shared</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">350+</span>
            <span className="stat-label">Active Donors</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">25+</span>
            <span className="stat-label">Partner Organizations</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;