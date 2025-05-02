import React, { useEffect, useState } from "react";
import "../styles/VolunteerDashboard.css";

const VolunteerDashboard = ({ user }) => {
  const [uploadedPhoto, setUploadedPhoto] = useState(null);
  const [photoDescription, setPhotoDescription] = useState("");
  const [inbox, setInbox] = useState([]);
  const [acceptedDonations, setAcceptedDonations] = useState([]);
  const [profileImageSrc, setProfileImageSrc] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  // Fetch donations only from the same location as the volunteer
  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/donations?location=${user.location}&status=pending`
        );
        const data = await res.json();
        setInbox(data);
      } catch (err) {
        console.error("Failed to fetch donations:", err);
      }
    };

    const fetchAcceptedDonations = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/donations?location=${user.location}&status=accepted&acceptedBy=${user.username}`
        );
        const data = await res.json();
        setAcceptedDonations(data);
      } catch (err) {
        console.error("Failed to fetch accepted donations:", err);
      }
    };

    if (user?.location) {
      fetchDonations();
      fetchAcceptedDonations();
    }
  }, [user?.location, user?.username]);

  useEffect(() => {
    if (user && user.profilePhoto) {
      if (user.profilePhoto.startsWith("http")) {
        setProfileImageSrc(user.profilePhoto);
      } else {
        const imgSrc = `http://localhost:5000/uploads/${user.profilePhoto}`;
        const testImg = new Image();
        testImg.onload = () => setProfileImageSrc(imgSrc);
        testImg.onerror = () => {
          console.error("Could not load profile image:", imgSrc);
          setProfileImageSrc("https://via.placeholder.com/100");
        };
        testImg.src = imgSrc;
      }
    } else {
      setProfileImageSrc("https://via.placeholder.com/100");
    }
  }, [user]);

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedPhoto(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const savePhotoToGallery = () => {
    if (!uploadedPhoto) {
      alert("Please upload a photo first!");
      return;
    }

    const existingPhotosJSON = localStorage.getItem("donatedPhotos");
    const existingPhotos = existingPhotosJSON ? JSON.parse(existingPhotosJSON) : [];

    const newPhoto = {
      id: Date.now(),
      imageUrl: uploadedPhoto,
      uploadedBy: user.fullName,
      username: user.username,
      uploadDate: new Date().toISOString(),
      description: photoDescription.trim() || "Food donation",
    };

    const updatedPhotos = [newPhoto, ...existingPhotos];
    localStorage.setItem("donatedPhotos", JSON.stringify(updatedPhotos));
    window.dispatchEvent(new Event("storageUpdate"));

    setUploadedPhoto(null);
    setPhotoDescription("");

    showToastMessage("Photo added to gallery successfully!");
  };

  const handleAcceptDonation = async (donationId) => {
    try {
      const res = await fetch(`http://localhost:5000/api/donations/${donationId}/accept`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          acceptedBy: user.username,
          acceptedByName: user.fullName || user.username,
          status: "accepted"
        }),
      });

      if (res.ok) {
        // Get the updated donation from response
        const acceptedDonation = await res.json();
        
        // Remove the donation from inbox
        setInbox(inbox.filter(donation => donation._id !== donationId));
        
        // Add to accepted donations
        setAcceptedDonations([acceptedDonation, ...acceptedDonations]);
        
        showToastMessage("Donation accepted successfully!");
      } else {
        const errorData = await res.json();
        showToastMessage(errorData.message || "Failed to accept donation.");
      }
    } catch (err) {
      console.error("Error accepting donation:", err);
      showToastMessage("Error accepting donation. Please try again.");
    }
  };

  const showToastMessage = (message) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className="volunteer-dashboard">
      {showToast && <div className="toast-popup">{toastMessage}</div>}

      <div className="profile-section">
        <img
          src={profileImageSrc}
          alt="Profile"
          className="profile-photo"
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/100";
          }}
        />
        <h2>{user.fullName || user.username}</h2>
        <p>Username: {user.username}</p>
      </div>

      <div className="upload-section">
        <h3>Upload Donated Food Photo</h3>
        <div className="upload-form">
          <input
            type="file"
            accept="image/*"
            onChange={handlePhotoUpload}
            className="file-input"
          />
          <textarea
            placeholder="Describe the donated food (optional)"
            value={photoDescription}
            onChange={(e) => setPhotoDescription(e.target.value)}
            className="description-input"
          />
          <button onClick={savePhotoToGallery} disabled={!uploadedPhoto} className="save-button">
            Save to Gallery
          </button>
        </div>

        {uploadedPhoto && (
          <div className="preview-photo">
            <h4>Preview:</h4>
            <img src={uploadedPhoto} alt="Uploaded" />
          </div>
        )}
      </div>

      <div className="inbox-section">
        <h3>Inbox – Collection Requests</h3>
        {inbox.length > 0 ? (
          <ul className="donation-list">
            {inbox.map((request) => (
              <li key={request._id} className="donation-item">
                <div className="donation-info">
                  <strong>{request.donorName}</strong> donated{" "}
                  <em>{request.foodType}</em> – {request.quantity} at{" "}
                  <u>{request.location}</u>
                </div>
                <button 
                  className="accept-button"
                  onClick={() => handleAcceptDonation(request._id)}
                >
                  Accept
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No collection requests yet.</p>
        )}
      </div>

      <div className="accepted-donations-section">
        <h3>My Accepted Donations</h3>
        {acceptedDonations.length > 0 ? (
          <ul className="donation-list">
            {acceptedDonations.map((donation) => (
              <li key={donation._id} className="donation-item accepted">
                <div className="donation-info">
                  <strong>{donation.donorName}</strong> donated{" "}
                  <em>{donation.foodType}</em> – {donation.quantity} at{" "}
                  <u>{donation.location}</u>
                </div>
                <div className="accepted-status">✓ Accepted</div>
              </li>
            ))}
          </ul>
        ) : (
          <p>You haven't accepted any donations yet.</p>
        )}
      </div>
    </div>
  );
};

export default VolunteerDashboard;