import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/ChooseDonation.css"; // optional: for initial styling
import "../styles/DonateCash.css"; // Import CSS for DonateCash page

function ChooseDonation() {
  const navigate = useNavigate();

  const handleDonateCashClick = () => {
    navigate("/donate-cash");
  };

  return (
    <div className="choose-donation">
      <h2>Choose How You Want to Help</h2>
      <div className="donation-options">
        <button className="donate-button" onClick={() => navigate("/donor-dashboard")}>
          Donate Food
        </button>
        <button className="donate-button donate-cash-button" onClick={handleDonateCashClick}>
          Donate Cash
        </button>
      </div>
    </div>
  );
}

export default ChooseDonation;