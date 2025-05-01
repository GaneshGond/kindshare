import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/ChooseDonation.css"; // optional: for styling

function ChooseDonation() {
  const navigate = useNavigate();

  return (
    <div className="choose-donation">
      <h2>Choose How You Want to Help</h2>
      <div className="donation-options">
        <button className="donate-button" onClick={() => navigate("/register")}>
          Donate Food
        </button>
        <button className="donate-button" onClick={() => alert("Donate Cash coming soon!")}>
          Donate Cash
        </button>
      </div>
    </div>
  );
}

export default ChooseDonation;
