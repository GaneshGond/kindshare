import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/DonateCash.css";

function DonateCash() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    donorName: "",
    email: "",
    phone: "",
    amount: "",
    paymentMethod: "upi"
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Get existing donations or initialize an empty array
    const existingDonations = JSON.parse(localStorage.getItem("cashDonations")) || [];

    // Add current donation with timestamp
    const newDonation = {
      ...formData,
      date: new Date().toLocaleString()
    };

    existingDonations.push(newDonation);
    localStorage.setItem("cashDonations", JSON.stringify(existingDonations));

    alert("Thank you for your donation! We appreciate your support.");
    navigate("/donor-dashboard");
  };

  return (
    <div className="donate-cash-container">
      <h2>Donate Cash</h2>
      <form onSubmit={handleSubmit} className="cash-donation-form">
        <div className="form-group">
          <label htmlFor="donorName">Full Name:</label>
          <input 
            type="text" 
            id="donorName" 
            name="donorName" 
            value={formData.donorName}
            onChange={handleChange}
            placeholder="Enter your full name"
            required 
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            value={formData.email}
            onChange={handleChange}
            placeholder="your.email@example.com"
            required 
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="phone">Phone Number:</label>
          <input 
            type="tel" 
            id="phone" 
            name="phone" 
            value={formData.phone}
            onChange={handleChange}
            placeholder="Your contact number"
            required 
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="amount">Amount (INR):</label>
          <input 
            type="number" 
            id="amount" 
            name="amount" 
            min="1"
            value={formData.amount}
            onChange={handleChange}
            placeholder="0"
            required 
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="paymentMethod">Payment Method:</label>
          <select 
            id="paymentMethod" 
            name="paymentMethod"
            value={formData.paymentMethod}
            onChange={handleChange}
          >
            <option value="upi">UPI</option>
            <option value="netbanking">Net Banking</option>
            <option value="debitcard">Debit Card</option>
            <option value="creditcard">Credit Card</option>
          </select>
        </div>
        
        <button type="submit" className="submit-donation-button">Donate Now</button>
        <button type="button" className="cancel-button" onClick={() => navigate(-1)}>Cancel</button>
      </form>
    </div>
  );
}

export default DonateCash;