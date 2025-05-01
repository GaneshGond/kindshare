// import React, { useEffect, useState } from "react";
// import "../styles/VolunteerDashboard.css";

// const VolunteerDashboard = ({ user }) => {
//   const [uploadedPhoto, setUploadedPhoto] = useState(null);
//   const [photoDescription, setPhotoDescription] = useState("");
//   const [inbox, setInbox] = useState([]);
//   const [profileImageSrc, setProfileImageSrc] = useState(null);
//   const [showToast, setShowToast] = useState(false); // For popup message



//   useEffect(() => {
//     const fetchDonations = async () => {
//       try {
//         const res = await fetch(`http://localhost:5000/api/donations?location=${user.location}`);
//         const data = await res.json();
//         setInbox(data);
//       } catch (err) {
//         console.error("Failed to fetch donations:", err);
//       }
//     };

//     fetchDonations();
//   }, [user.location]);

//   useEffect(() => {
//     if (user && user.profilePhoto) {
//       if (user.profilePhoto.startsWith('http')) {
//         setProfileImageSrc(user.profilePhoto);
//       } else {
//         const imgSrc = `http://localhost:5000/uploads/${user.profilePhoto}`;
//         const testImg = new Image();
//         testImg.onload = () => setProfileImageSrc(imgSrc);
//         testImg.onerror = () => {
//           console.error("Could not load profile image:", imgSrc);
//           setProfileImageSrc("https://via.placeholder.com/100");
//         };
//         testImg.src = imgSrc;
//       }
//     } else {
//       setProfileImageSrc("https://via.placeholder.com/100");
//     }
//   }, [user]);

//   const handlePhotoUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setUploadedPhoto(reader.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const savePhotoToGallery = () => {
//     if (!uploadedPhoto) {
//       alert("Please upload a photo first!");
//       return;
//     }

//     const existingPhotosJSON = localStorage.getItem('donatedPhotos');
//     const existingPhotos = existingPhotosJSON ? JSON.parse(existingPhotosJSON) : [];

//     const newPhoto = {
//       id: Date.now(),
//       imageUrl: uploadedPhoto,
//       uploadedBy: user.fullName,
//       username: user.username,
//       uploadDate: new Date().toISOString(),
//       description: photoDescription.trim() || "Food donation"
//     };

//     const updatedPhotos = [newPhoto, ...existingPhotos];
//     localStorage.setItem('donatedPhotos', JSON.stringify(updatedPhotos));
//     window.dispatchEvent(new Event('storageUpdate'));

//     // Reset form
//     setUploadedPhoto(null);
//     setPhotoDescription("");

//     // Show toast
//     setShowToast(true);
//     setTimeout(() => setShowToast(false), 3000);
//   };

//   return (
//     <div className="volunteer-dashboard">
//       {/* Toast message */}
//       {showToast && (
//         <div className="toast-popup">
//           Photo added to gallery successfully!
//         </div>
//       )}

//       <div className="profile-section">
//         <img
//           src={profileImageSrc}
//           alt="Profile"
//           className="profile-photo"
//           onError={(e) => {
//             e.target.src = "https://via.placeholder.com/100";
//           }}
//         />
//         <h2>{user.fullName}</h2>
//         <p>Username: {user.username}</p>
//       </div>

//       <div className="upload-section">
//         <h3>Upload Donated Food Photo</h3>
//         <div className="upload-form">
//           <input
//             type="file"
//             accept="image/*"
//             onChange={handlePhotoUpload}
//             className="file-input"
//           />

//           <textarea
//             placeholder="Describe the donated food (optional)"
//             value={photoDescription}
//             onChange={(e) => setPhotoDescription(e.target.value)}
//             className="description-input"
//           />

//           <button
//             onClick={savePhotoToGallery}
//             disabled={!uploadedPhoto}
//             className="save-button"
//           >
//             Save to Gallery
//           </button>
//         </div>

//         {uploadedPhoto && (
//           <div className="preview-photo">
//             <h4>Preview:</h4>
//             <img src={uploadedPhoto} alt="Uploaded" />
//           </div>
//         )}
//       </div>

//       <div className="inbox-section">
//         <h3>Inbox – Collection Requests</h3>
//         {inbox.length > 0 ? (
//           <ul>
//             {inbox.map((request) => (
//               <li key={request._id}>
//                 <strong>{request.donorName}</strong> donated <em>{request.foodType}</em> – {request.quantity} at <u>{request.location}</u>
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <p>No collection requests yet.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default VolunteerDashboard;

import React, { useEffect, useState } from "react";
import "../styles/VolunteerDashboard.css";

const VolunteerDashboard = ({ user }) => {
  const [uploadedPhoto, setUploadedPhoto] = useState(null);
  const [photoDescription, setPhotoDescription] = useState("");
  const [inbox, setInbox] = useState([]);
  const [profileImageSrc, setProfileImageSrc] = useState(null);
  const [showToast, setShowToast] = useState(false);

  // Fetch donations only from the same location as the volunteer
  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/donations?location=${user.location}`
        );
        const data = await res.json();
        setInbox(data);
      } catch (err) {
        console.error("Failed to fetch donations:", err);
      }
    };

    if (user?.location) {
      fetchDonations();
    }
  }, [user?.location]);

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

    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className="volunteer-dashboard">
      {showToast && <div className="toast-popup">Photo added to gallery successfully!</div>}

      <div className="profile-section">
        <img
          src={profileImageSrc}
          alt="Profile"
          className="profile-photo"
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/100";
          }}
        />
        <h2>{user.fullName}</h2>
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
          <ul>
            {inbox.map((request) => (
              <li key={request._id}>
                <strong>{request.donorName}</strong> donated{" "}
                <em>{request.foodType}</em> – {request.quantity} at{" "}
                <u>{request.location}</u>
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
