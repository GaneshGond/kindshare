// import React, { useEffect, useState } from "react";
// import "../styles/VolunteerDashboard.css";

// const VolunteerDashboard = () => {
//   const [volunteer, setVolunteer] = useState(null);
//   const [uploadedPhoto, setUploadedPhoto] = useState(null);
//   const [inbox, setInbox] = useState([]);

//   // useEffect(() => {
//   //   // Simulate fetching volunteer profile from database
//   //   const loggedInUser = {
//   //     role: "volunteer",
//   //     fullName: "Anjali Sharma",
//   //     username: "anjali_volunteer",
//   //     profilePhoto: "https://via.placeholder.com/100",
//   //   };

//   //   if (loggedInUser.role === "volunteer") {
//   //     setVolunteer(loggedInUser);
//   //   }

//   //   // Simulate fetching collection requests
//   //   setInbox([
//   //     {
//   //       id: 1,
//   //       donorName: "Ravi Kumar",
//   //       foodType: "Cooked Rice",
//   //       quantity: "5 kg",
//   //       location: "Indiranagar, Bangalore",
//   //     },
//   //     {
//   //       id: 2,
//   //       donorName: "Neha Singh",
//   //       foodType: "Chapati & Curry",
//   //       quantity: "20 plates",
//   //       location: "JP Nagar, Bangalore",
//   //     },
//   //   ]);
//   // }, []);

// useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const res = await fetch(`http://localhost:5000/api/user/${username}`); // Replace with actual username
//         const data = await res.json();
//         if (data.role === "volunteer") setDonor(data);
//       } catch (err) {
//         console.error("Failed to fetch volunteer:", err);
//       }
//     };
  
//     fetchUser();
//   }, []);


//   const handlePhotoUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setUploadedPhoto(URL.createObjectURL(file));
//       alert("Photo uploaded successfully!");
//     }
//   };

//   if (!volunteer) {
//     return <h2>Access denied. Only volunteers can view this page.</h2>;
//   }

//   return (
//     <div className="volunteer-dashboard">
//       <div className="profile-section">
//         <img src={volunteer.profilePhoto} alt="Profile" className="profile-photo" />
//         <h2>{volunteer.fullName}</h2>
//         <p>Username: {volunteer.username}</p>
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
//               <li key={request.id}>
//                 <strong>{request.donorName}</strong> donated <em>{request.foodType}</em> 
//                 – {request.quantity} at <u>{request.location}</u>
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

// import React, { useEffect, useState } from "react";
// import "../styles/VolunteerDashboard.css";

// const VolunteerDashboard = () => {
//   const [volunteer, setVolunteer] = useState(null);
//   const [uploadedPhoto, setUploadedPhoto] = useState(null);
//   const [inbox, setInbox] = useState([]);

//   useEffect(() => {
//     const username = localStorage.getItem("username");
//     if (!username) return;

//     const fetchUserAndRequests = async () => {
//       try {
//         const userRes = await fetch(`http://localhost:5000/api/user/${username}`);
//         const userData = await userRes.json();
//         if (userData.role === "volunteer") {
//           setVolunteer(userData);

//           const donationRes = await fetch("http://localhost:5000/api/donations");
//           const donationData = await donationRes.json();
//           setInbox(donationData);
//         }
//       } catch (err) {
//         console.error("Failed to fetch volunteer or donations:", err);
//       }
//     };

//     fetchUserAndRequests();
//   }, []);

//   const handlePhotoUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setUploadedPhoto(URL.createObjectURL(file));
//       alert("Photo uploaded successfully!");
//     }
//   };

//   if (!volunteer) {
//     return <h2>Access denied. Only volunteers can view this page.</h2>;
//   }

//   return (
//     <div className="volunteer-dashboard">
//       <div className="profile-section">
//         <img src={volunteer.profilePhoto} alt="Profile" className="profile-photo" />
//         <h2>{volunteer.fullName}</h2>
//         <p>Username: {volunteer.username}</p>
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
  const [inbox, setInbox] = useState([]);

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/donations");
        const data = await res.json();
        setInbox(data);
      } catch (err) {
        console.error("Failed to fetch donations:", err);
      }
    };

    fetchDonations();
  }, []);

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedPhoto(URL.createObjectURL(file));
      alert("Photo uploaded successfully!");
    }
  };

  return (
    <div className="volunteer-dashboard">
      <div className="profile-section">
        <img src={user.profilePhoto} alt="Profile" className="profile-photo" />
        <h2>{user.fullName}</h2>
        <p>Username: {user.username}</p>
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

