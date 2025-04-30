import React, { useEffect, useState } from "react";
import "../styles/VolunteerDashboard.css";

const VolunteerDashboard = () => {
  const [volunteer, setVolunteer] = useState(null);
  const [uploadedPhoto, setUploadedPhoto] = useState(null);
  const [inbox, setInbox] = useState([]);

  useEffect(() => {
    // Simulate fetching volunteer profile from database
    const loggedInUser = {
      role: "volunteer",
      fullName: "Anjali Sharma",
      username: "anjali_volunteer",
      profilePhoto: "https://via.placeholder.com/100",
    };

    if (loggedInUser.role === "volunteer") {
      setVolunteer(loggedInUser);
    }

    // Simulate fetching collection requests
    setInbox([
      {
        id: 1,
        donorName: "Ravi Kumar",
        foodType: "Cooked Rice",
        quantity: "5 kg",
        location: "Indiranagar, Bangalore",
      },
      {
        id: 2,
        donorName: "Neha Singh",
        foodType: "Chapati & Curry",
        quantity: "20 plates",
        location: "JP Nagar, Bangalore",
      },
    ]);
  }, []);

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedPhoto(URL.createObjectURL(file));
      alert("Photo uploaded successfully!");
    }
  };

  if (!volunteer) {
    return <h2>Access denied. Only volunteers can view this page.</h2>;
  }

  return (
    <div className="volunteer-dashboard">
      <div className="profile-section">
        <img src={volunteer.profilePhoto} alt="Profile" className="profile-photo" />
        <h2>{volunteer.fullName}</h2>
        <p>Username: {volunteer.username}</p>
      </div>

      <div className="upload-section">
        <h3>Upload Donated Photo</h3>
        <input type="file" accept="image/*" onChange={handlePhotoUpload} />
        {uploadedPhoto && (
          <div className="preview-photo">
            <img src={uploadedPhoto} alt="Uploaded" />
          </div>
        )}
      </div>

      <div className="inbox-section">
        <h3>Inbox – Collection Requests</h3>
        {inbox.length > 0 ? (
          <ul>
            {inbox.map((request) => (
              <li key={request.id}>
                <strong>{request.donorName}</strong> donated <em>{request.foodType}</em> 
                – {request.quantity} at <u>{request.location}</u>
              </li>
            ))}
          </ul>
        ) : (
          <p>No collection requests yet.</p>
        )}
      </div>
    </div>
  );
};

export default VolunteerDashboard;
