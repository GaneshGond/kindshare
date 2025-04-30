import React, { useEffect, useState } from "react";
import "../styles/DonorDashboard.css";

const DonorDashboard = () => {
  // Simulating logged-in donor data (this would come from backend later)
  const [donor, setDonor] = useState(null);

  const [formData, setFormData] = useState({
    foodType: "",
    quantity: "",
    location: "",
  });

  useEffect(() => {
    // Simulated fetch from backend for logged-in user
    const loggedInUser = {
      role: "donor",
      fullName: "Ravi Kumar",
      username: "ravi_donor",
      profilePhoto: "https://via.placeholder.com/100",
    };

    if (loggedInUser.role === "donor") {
      setDonor(loggedInUser);
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Donation submitted:", formData);
    // In future: send data to backend via POST request
    alert("Donation submitted successfully!");
    setFormData({ foodType: "", quantity: "", location: "" });
  };

  if (!donor) {
    return <h2>Access denied. Only donors can view this page.</h2>;
  }

  return (
    <div className="donor-dashboard">
      <div className="profile-section">
        <img src={donor.profilePhoto} alt="Profile" className="profile-photo" />
        <h2>{donor.fullName}</h2>
        <p>Username: {donor.username}</p>
      </div>

      <div className="donation-form">
        <h3>Submit Food Donation</h3>
        <form onSubmit={handleSubmit}>
          <label>
            Food Type:
            <input
              type="text"
              name="foodType"
              value={formData.foodType}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Quantity:
            <input
              type="text"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Location:
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
            />
          </label>

          <button type="submit">Submit Donation</button>
        </form>
      </div>
    </div>
  );
};

export default DonorDashboard;
