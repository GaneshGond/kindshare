// import React, { useEffect, useState } from "react";
// import "../styles/VolunteerDashboard.css";

// const VolunteerDashboard = ({ user }) => {
//   const [uploadedPhoto, setUploadedPhoto] = useState(null);
//   const [inbox, setInbox] = useState([]);
//   const [profileImageSrc, setProfileImageSrc] = useState(null);

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
//     // Handle profile image logic
//     if (user && user.profilePhoto) {
//       // Check if profilePhoto is already a full URL
//       if (user.profilePhoto.startsWith('http')) {
//         setProfileImageSrc(user.profilePhoto);
//       } else {
//         // Try to load from server
//         const imgSrc = `http://localhost:5000/uploads/${user.profilePhoto}`;
        
//         // Test if the image exists
//         const testImg = new Image();
//         testImg.onload = () => setProfileImageSrc(imgSrc);
//         testImg.onerror = () => {
//           console.error("Could not load profile image:", imgSrc);
//           // Fallback to a default image
//           setProfileImageSrc("https://via.placeholder.com/100");
//         };
//         testImg.src = imgSrc;
//       }
//     } else {
//       // Fallback to default image if no profile photo
//       setProfileImageSrc("https://via.placeholder.com/100");
//     }
//   }, [user]);

//   const handlePhotoUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setUploadedPhoto(URL.createObjectURL(file));
//       alert("Photo uploaded successfully!");
//     }
//   };

//   return (
//     <div className="volunteer-dashboard">
//       <div className="profile-section">
//         <img 
//           src={profileImageSrc} 
//           alt="Profile" 
//           className="profile-photo" 
//           onError={(e) => {
//             // Fallback if image fails to load
//             e.target.src = "https://via.placeholder.com/100"; 
//           }}
//         />
//         <h2>{user.fullName}</h2>
//         <p>Username: {user.username}</p>
//       </div>

//       <div className="upload-section">
//         <h3>Upload Donated Photo</h3>
//         <input type="file" accept="image/*" onChange={handlePhotoUpload} />
//         {uploadedPhoto && (
//           <div className="preview-photo">
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

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/donations?location=${user.location}`);
        const data = await res.json();
        setInbox(data);
      } catch (err) {
        console.error("Failed to fetch donations:", err);
      }
    };
  
    fetchDonations();
  }, [user.location]);

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

    // Get existing photos from localStorage
    const existingPhotosJSON = localStorage.getItem('donatedPhotos');
    const existingPhotos = existingPhotosJSON ? JSON.parse(existingPhotosJSON) : [];

    // Create a new photo entry
    const newPhoto = {
      id: Date.now(), // Unique ID based on timestamp
      imageUrl: uploadedPhoto,
      uploadedBy: user.fullName,
      username: user.username,
      uploadDate: new Date().toISOString(),
      description: photoDescription.trim() || "Food donation"
    };

    // Add to existing photos
    const updatedPhotos = [newPhoto, ...existingPhotos];
    
    // Save back to localStorage
    localStorage.setItem('donatedPhotos', JSON.stringify(updatedPhotos));
    
    // Dispatch an event to notify other components of the update
    window.dispatchEvent(new Event('storageUpdate'));
    
    // Reset form
    setUploadedPhoto(null);
    setPhotoDescription("");
    
    alert("Photo added to gallery successfully!");
  };

  return (
    <div className="volunteer-dashboard">
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
          
          <button 
            onClick={savePhotoToGallery} 
            disabled={!uploadedPhoto}
            className="save-button"
          >
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
                <strong>{request.donorName}</strong> donated <em>{request.foodType}</em> – {request.quantity} at <u>{request.location}</u>
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