import React, { useEffect, useState } from "react";
import "../styles/DonorBlogs.css";

function DonorBlogs() {
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    const storedDonations = JSON.parse(localStorage.getItem("cashDonations")) || [];
    setDonations(storedDonations.reverse()); // Show latest first
  }, []);

  return (
    <div className="donor-blogs-section">
      <h2>Donor Stories</h2>
      <div className="donor-blog-list">
        {donations.length === 0 ? (
          <p>No donations yet. Be the first to donate!</p>
        ) : (
          donations.map((donation, index) => (
            <div key={index} className="donor-blog-card">
              <h3>{donation.donorName}</h3>
              <p><strong>Donated:</strong> ₹{donation.amount}</p>
           
              <p><strong>Date:</strong> {donation.date}</p>
              <p className="thank-you-note">Thank you for spreading kindness through your generous donation.</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default DonorBlogs;