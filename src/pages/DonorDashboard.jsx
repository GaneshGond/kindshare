// import React, { useEffect, useState } from "react";
// import "../styles/DonorDashboard.css";

// const DonorDashboard = () => {
//   // Simulating logged-in donor data (this would come from backend later)
//   const [donor, setDonor] = useState(null);

//   const [formData, setFormData] = useState({
//     foodType: "",
//     quantity: "",
//     location: "",
//   });

//   // useEffect(() => {
//   //   // Simulated fetch from backend for logged-in user
//   //   const loggedInUser = {
//   //     role: "donor",
//   //     fullName: "Ravi Kumar",
//   //     username: "ravi_donor",
//   //     profilePhoto: "https://via.placeholder.com/100",
//   //   };

//   //   if (loggedInUser.role === "donor") {
//   //     setDonor(loggedInUser);
//   //   }
//   // }, []);

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const res = await fetch(`http://localhost:5000/api/user/${username}`); // Replace with actual username
//         const data = await res.json();
//         if (data.role === "donor") setDonor(data);
//       } catch (err) {
//         console.error("Failed to fetch donor:", err);
//       }
//     };
  
//     fetchUser();
//   }, []);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Donation submitted:", formData);
//     // In future: send data to backend via POST request
//     alert("Donation submitted successfully!");
//     setFormData({ foodType: "", quantity: "", location: "" });
//   };

//   if (!donor) {
//     return <h2>Access denied. Only donors can view this page.</h2>;
//   }

//   return (
//     <div className="donor-dashboard">
//       <div className="profile-section">
//         <img src={donor.profilePhoto} alt="Profile" className="profile-photo" />
//         <h2>{donor.fullName}</h2>
//         <p>Username: {donor.username}</p>
//       </div>

//       <div className="donation-form">
//         <h3>Submit Food Donation</h3>
//         <form onSubmit={handleSubmit}>
//           <label>
//             Food Type:
//             <input
//               type="text"
//               name="foodType"
//               value={formData.foodType}
//               onChange={handleChange}
//               required
//             />
//           </label>

//           <label>
//             Quantity:
//             <input
//               type="text"
//               name="quantity"
//               value={formData.quantity}
//               onChange={handleChange}
//               required
//             />
//           </label>

//           <label>
//             Location:
//             <input
//               type="text"
//               name="location"
//               value={formData.location}
//               onChange={handleChange}
//               required
//             />
//           </label>

//           <button type="submit">Submit Donation</button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default DonorDashboard;


// import React, { useEffect, useState } from "react";
// import "../styles/DonorDashboard.css";

// const DonorDashboard = () => {
//   const [donor, setDonor] = useState(null);
//   const [formData, setFormData] = useState({
//     foodType: "",
//     quantity: "",
//     location: "",
//   });

//   useEffect(() => {
//     const username = localStorage.getItem("username");
//     if (!username) return;

//     const fetchUser = async () => {
//       try {
//         const res = await fetch(`http://localhost:5000/api/user/${username}`);
//         const data = await res.json();
//         if (data.role === "donor") setDonor(data);
//       } catch (err) {
//         console.error("Failed to fetch donor:", err);
//       }
//     };

//     fetchUser();
//   }, []);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await fetch("http://localhost:5000/api/donations", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           ...formData,
//           donorUsername: donor.username,
//           donorName: donor.fullName,
//         }),
//       });

//       if (res.ok) {
//         alert("Donation submitted successfully!");
//         setFormData({ foodType: "", quantity: "", location: "" });
//       } else {
//         alert("Failed to submit donation.");
//       }
//     } catch (err) {
//       console.error("Error submitting donation:", err);
//     }
//   };

//   if (!donor) {
//     return <h2>Access denied. Only donors can view this page.</h2>;
//   }

//   return (
//     <div className="donor-dashboard">
//       <div className="profile-section">
//         <img src={donor.profilePhoto} alt="Profile" className="profile-photo" />
//         <h2>{donor.fullName}</h2>
//         <p>Username: {donor.username}</p>
//       </div>

//       <div className="donation-form">
//         <h3>Submit Food Donation</h3>
//         <form onSubmit={handleSubmit}>
//           <label>
//             Food Type:
//             <input
//               type="text"
//               name="foodType"
//               value={formData.foodType}
//               onChange={handleChange}
//               required
//             />
//           </label>

//           <label>
//             Quantity:
//             <input
//               type="text"
//               name="quantity"
//               value={formData.quantity}
//               onChange={handleChange}
//               required
//             />
//           </label>

//           <label>
//             Location:
//             <input
//               type="text"
//               name="location"
//               value={formData.location}
//               onChange={handleChange}
//               required
//             />
//           </label>

//           <button type="submit">Submit Donation</button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default DonorDashboard;


// import React, { useState } from "react";
// import "../styles/DonorDashboard.css";

// const DonorDashboard = ({ user }) => {
//   const [formData, setFormData] = useState({
//     foodType: "",
//     quantity: "",
//     location: "",
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await fetch("http://localhost:5000/api/donations", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           ...formData,
//           donorUsername: user.username,
//           donorName: user.fullName,
//         }),
//       });

//       if (res.ok) {
//         alert("Donation submitted successfully!");
//         setFormData({ foodType: "", quantity: "", location: "" });
//       } else {
//         alert("Failed to submit donation.");
//       }
//     } catch (err) {
//       console.error("Error submitting donation:", err);
//     }
//   };

//   return (
//     <div className="donor-dashboard">
//       <div className="profile-section">
//       <img
//       src={`http://localhost:5000/uploads/${user.profilePhoto}`}
//       alt="Profile"
//       className="profile-photo"
//       />
//         {/* <img src={user.profilePhoto} alt="Profile" className="profile-photo" /> */}
//         <h2>{user.fullName}</h2>
//         <p>Username: {user.username}</p>
//       </div>

//       <div className="donation-form">
//         <h3>Submit Food Donation</h3>
//         <form onSubmit={handleSubmit}>
//           <label>
//             Food Type:
//             <input type="text" name="foodType" value={formData.foodType} onChange={handleChange} required />
//           </label>

//           <label>
//             Quantity:
//             <input type="text" name="quantity" value={formData.quantity} onChange={handleChange} required />
//           </label>

//           <label>
//             Location:
//             <input type="text" name="location" value={formData.location} onChange={handleChange} required />
//           </label>

//           <button type="submit">Submit Donation</button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default DonorDashboard;



import React, { useState, useEffect } from "react";
import "../styles/DonorDashboard.css";

const DonorDashboard = ({ user }) => {
  const [formData, setFormData] = useState({
    foodType: "",
    quantity: "",
    location: "",
  });
  const [profileImageSrc, setProfileImageSrc] = useState(null);

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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user); // Log the user object to check if fullName is available
    try {
      const res = await fetch("http://localhost:5000/api/donations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          donorUsername: user.username,
          donorName: user.fullName
        }),
      });
  
      if (res.ok) {
        alert("Donation submitted successfully!");
        setFormData({ foodType: "", quantity: "", location: "" });
      } else {
        alert("Failed to submit donation.");
      }
    } catch (err) {
      console.error("Error submitting donation:", err);
    }
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
        <h2>{user.fullName}</h2>
        <p>Username: {user.username}</p>
      </div>

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
    </div>
  );
};

export default DonorDashboard;