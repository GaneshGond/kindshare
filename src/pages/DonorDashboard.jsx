import React, { useState, useEffect } from "react";
import "../styles/DonorDashboard.css";

const DonorDashboard = ({ user }) => {
  const [formData, setFormData] = useState({
    foodType: "",
    quantity: "",
    location: "",
  });
  const [profileImageSrc, setProfileImageSrc] = useState(null);
  const [donations, setDonations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Handle profile image logic
    if (user && user.profilePhoto) {
      // Check if profilePhoto is already a full URL
      if (user.profilePhoto.startsWith('http')) {
        setProfileImageSrc(user.profilePhoto);
      } else {
        // Try to load from server
        const imgSrc = `http://localhost:5000/uploads/${user.profilePhoto}`;
        
        // Test if the image exists
        const testImg = new Image();
        testImg.onload = () => setProfileImageSrc(imgSrc);
        testImg.onerror = () => {
          console.error("Could not load profile image:", imgSrc);
          // Fallback to a default image
          setProfileImageSrc("https://via.placeholder.com/100");
        };
        testImg.src = imgSrc;
      }
    } else {
      // Fallback to default image if no profile photo
      setProfileImageSrc("https://via.placeholder.com/100");
    }

    // Fetch user's previous donations
    const fetchDonations = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`http://localhost:5000/api/donations/user/${user.username}`);
        if (response.ok) {
          const data = await response.json();
          setDonations(data);
        } else {
          console.error("Failed to fetch donations");
        }
      } catch (error) {
        console.error("Error fetching donations:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (user && user.username) {
      fetchDonations();
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/donations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          donorUsername: user.username,
          donorName: user.fullName || user.username, // Use username as fallback if fullName isn't available
        }),
      });

      if (res.ok) {
        alert("Donation submitted successfully!");
        setFormData({ foodType: "", quantity: "", location: "" });
        
        // Refresh donations list
        const response = await fetch(`http://localhost:5000/api/donations/user/${user.username}`);
        if (response.ok) {
          const data = await response.json();
          setDonations(data);
        }
      } else {
        alert("Failed to submit donation.");
      }
    } catch (err) {
      console.error("Error submitting donation:", err);
    }
  };

  // Helper function to get status badge class
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "pending":
        return "status-badge pending";
      case "accepted":
        return "status-badge accepted";
      case "completed":
        return "status-badge completed";
      default:
        return "status-badge";
    }
  };

  // Format date from ISO string
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="donor-dashboard">
      <div className="profile-section">
        <img 
          src={profileImageSrc} 
          alt="Profile" 
          className="profile-photo" 
          onError={(e) => {
            // Fallback if image fails to load
            e.target.src = "https://via.placeholder.com/100";
          }}
        />
        <h2>{user.fullName || user.username}</h2>
        <p>Username: {user.username}</p>
      </div>

      <div className="dashboard-content">
        <div className="donation-form">
          <h3>Submit Food Donation</h3>
          <form onSubmit={handleSubmit}>
            <label>
              Food Type:
              <input type="text" name="foodType" value={formData.foodType} onChange={handleChange} required />
            </label>

            <label>
              Quantity:
              <input type="text" name="quantity" value={formData.quantity} onChange={handleChange} required />
            </label>

            <label>
              Location:
              <input type="text" name="location" value={formData.location} onChange={handleChange} required />
            </label>

            <button type="submit">Submit Donation</button>
          </form>
        </div>

        <div className="previous-donations">
          <h3>Your Previous Donations</h3>
          {isLoading ? (
            <div className="loading">Loading your donations...</div>
          ) : donations.length === 0 ? (
            <div className="no-donations">You haven't made any donations yet.</div>
          ) : (
            <div className="donations-list">
              {donations.map((donation) => (
                <div className="donation-card" key={donation._id}>
                  <div className="donation-header">
                    <span className={getStatusBadgeClass(donation.status)}>
                      {donation.status?.charAt(0).toUpperCase() + donation.status?.slice(1)}
                    </span>
                    <span className="donation-date">{formatDate(donation.createdAt)}</span>
                  </div>
                  
                  <div className="donation-details">
                    <div className="detail-item">
                      <span className="label">Food:</span>
                      <span className="value">{donation.foodType}</span>
                    </div>
                    <div className="detail-item">
                      <span className="label">Quantity:</span>
                      <span className="value">{donation.quantity}</span>
                    </div>
                    <div className="detail-item">
                      <span className="label">Location:</span>
                      <span className="value">{donation.location}</span>
                    </div>
                    
                    {donation.status === "accepted" || donation.status === "completed" ? (
                      <div className="volunteer-info">
                        <span className="volunteer-label">Accepted by:</span>
                        <span className="volunteer-name">{donation.acceptedByName}</span>
                      </div>
                    ) : (
                      <div className="pending-message">Waiting for a volunteer to accept</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DonorDashboard;