import React from 'react';
import "../styles/LearnMore.css";

const LearnMore = () => {
  return (
    <div className="learn-more-container">
      <h1>Welcome to KindShare</h1>
      <p>
        KindShare is a community-powered platform that connects individuals who want to share leftover food
        with volunteers dedicated to distributing it to those in need.
      </p>
      
      <div>
        <h2>👥 Who Can Join?</h2>
        <ul>
          <li><strong>Donors:</strong> Individuals who have leftover food from their homes or events and wish to donate it instead of wasting it.</li>
          <li><strong>Volunteers:</strong> Responsible individuals who collect the donated food and deliver it to the needy in their area.</li>
        </ul>
      </div>
      
      <div>
        <h2>🔐 Registration Process</h2>
        <p>To join KindShare, users need to:</p>
        <ul>
          <li>Provide their <strong>full name, username, password, phone number, location</strong>, and upload a <strong>profile photo</strong>.</li>
          <li>Select whether they are registering as a <strong>Donor</strong> or a <strong>Volunteer</strong>.</li>
        </ul>
      </div>
      
      <div>
        <h2>🍱 How Donations Work</h2>
        <ul>
          <li>Donors can log in and fill out a form to donate leftover food, including the food details and optional images.</li>
          <li>Only <strong>volunteers from the same location</strong> as the donor will see and accept the donation request.</li>
          <li>Once accepted, the volunteer's details are visible to the donor, and the food is delivered to those in need.</li>
        </ul>
      </div>
      
      <div>
        <h2>📷 Donated Photos</h2>
        <p>View images of real donations that have already helped countless people. This section celebrates our contributors and builds community trust.</p>
      </div>
      
      <div>
        <h2>💡 Our Mission</h2>
        <p>
          At KindShare, our mission is simple — to reduce food waste and ensure no one goes hungry in our community.
          By bringing donors and volunteers together, we create a bridge of kindness, compassion, and care.
        </p>
      </div>
    </div>
  );
};

export default LearnMore;