// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import "../styles/Login.css"; // Reuse the same CSS

// function Register() {
//   const [role, setRole] = useState("donor");
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [location, setLocation] = useState("");
//   const [profilePhoto, setProfilePhoto] = useState(null);
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleRegister = async (e) => {
//     e.preventDefault();
//     setError("");
  
//     if (password !== confirmPassword) {
//       setError("Passwords do not match");
//       return;
//     }
  
//     const formData = new FormData();
//     formData.append("role", role);
//     formData.append("username", username);
//     formData.append("password", password);
//     formData.append("location", location);
//     formData.append("profilePhoto", profilePhoto);
  
//     try {
//       const response = await fetch("http://localhost:5000/api/register", {
//         method: "POST",
//         body: formData,
//       });
  
//       const result = await response.json();
  
//       if (response.ok) {
//         if (role === "donor") {
//           navigate("/donor-dashboard");
//         } else {
//           navigate("/volunteer-dashboard");
//         }
//       } else {
//         setError(result.error || "Registration failed");
//       }
//     } catch (err) {
//       setError("Something went wrong. Please try again.");
//     }
//   };
  

//   const handlePhotoChange = (e) => {
//     const file = e.target.files[0];
//     setProfilePhoto(file);
//   };

//   return (
//     <div className="login-container">
//       <div className="login-card">
//         <div className="login-header">
//           <div className="login-logo">
//             <span className="login-logo-icon">🤝</span>
//             <h2>KindShare</h2>
//           </div>
//           <h3>Create Account</h3>
//           <p>Join us to share kindness and reduce food waste</p>
//         </div>

//         {error && (
//           <div className="error-message">
//             <span className="error-icon">⚠️</span>
//             {error}
//           </div>
//         )}

//         <form onSubmit={handleRegister} className="login-form">
//           <div className="form-group">
//             <label htmlFor="role">Select Role</label>
//             <select
//               id="role"
//               value={role}
//               onChange={(e) => setRole(e.target.value)}
//               className="select-input"
//               required
//             >
//               <option value="donor">Donor</option>
//               <option value="volunteer">Volunteer</option>
//             </select>
//           </div>

//           <div className="form-group">
//             <label htmlFor="username">Username</label>
//             <div className="input-container">
//               <span className="input-icon">👤</span>
//               <input
//                 id="username"
//                 placeholder="Enter your username"
//                 value={username}
//                 onChange={(e) => setUsername(e.target.value)}
//                 required
//               />
//             </div>
//           </div>

//           <div className="form-group">
//             <label htmlFor="password">Password</label>
//             <div className="input-container">
//               <span className="input-icon">🔒</span>
//               <input
//                 id="password"
//                 type="password"
//                 placeholder="Create a password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//               />
//             </div>
//           </div>

//           <div className="form-group">
//             <label htmlFor="confirmPassword">Confirm Password</label>
//             <div className="input-container">
//               <span className="input-icon">🔒</span>
//               <input
//                 id="confirmPassword"
//                 type="password"
//                 placeholder="Confirm your password"
//                 value={confirmPassword}
//                 onChange={(e) => setConfirmPassword(e.target.value)}
//                 required
//               />
//             </div>
//           </div>

//           <div className="form-group">
//             <label htmlFor="location">Your Location</label>
//             <div className="input-container">
//               <span className="input-icon">📍</span>
//               <input
//                 id="location"
//                 type="text"
//                 placeholder="Enter your city or area"
//                 value={location}
//                 onChange={(e) => setLocation(e.target.value)}
//                 required
//               />
//             </div>
//           </div>

//           <div className="form-group">
//             <label htmlFor="profilePhoto">Profile Photo</label>
//             <input
//               id="profilePhoto"
//               type="file"
//               accept="image/*"
//               onChange={handlePhotoChange}
//               required
//             />
//           </div>

//           <button type="submit" className="login-button">
//             Register
//           </button>
//         </form>

//         <div className="login-footer">
//           <p>Already have an account?</p>
//           <Link to="/login" className="register-link">
//             Login
//           </Link>
//         </div>
//       </div>

//       <div className="login-background">
//         <div className="login-background-content">
//           <h2>Together We Can Make a Difference</h2>
//           <p>Register now and start making an impact in your community.</p>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Register;


import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Login.css"; // Reuse the same CSS

function Register() {
  const [role, setRole] = useState("donor");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [location, setLocation] = useState("");
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [error, setError] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
  
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
  
    const formData = new FormData();
    formData.append("role", role);
    formData.append("username", username);
    formData.append("password", password);
    formData.append("location", location);
    formData.append("profilePhoto", profilePhoto);
  
    try {
      const response = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        body: formData,
      });
  
      const result = await response.json();
  
      if (response.ok) {
        setShowSuccess(true);
      } else {
        setError(result.error || "Registration failed");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
  };

  const handleNavigateToLogin = () => {
    navigate("/login");
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setProfilePhoto(file);
  };

  if (showSuccess) {
    return (
      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <div className="login-logo">
              <span className="login-logo-icon">🤝</span>
              <h2>KindShare</h2>
            </div>
            <h3>Registration Successful! 🎉</h3>
            <p>Your account has been created successfully</p>
          </div>

          <div className="success-message">
            <span className="success-icon">✅</span>
            <p>Thank you for joining KindShare! You can now log in to your account.</p>
          </div>

          <button onClick={handleNavigateToLogin} className="login-button">
            Go to Login Page
          </button>
        </div>

        <div className="login-background">
          <div className="login-background-content">
            <h2>Welcome to KindShare</h2>
            <p>Your journey of making an impact in your community begins now.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <div className="login-logo">
            <span className="login-logo-icon">🤝</span>
            <h2>KindShare</h2>
          </div>
          <h3>Create Account</h3>
          <p>Join us to share kindness and reduce food waste</p>
        </div>

        {error && (
          <div className="error-message">
            <span className="error-icon">⚠️</span>
            {error}
          </div>
        )}

        <form onSubmit={handleRegister} className="login-form">
          <div className="form-group">
            <label htmlFor="role">Select Role</label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="select-input"
              required
            >
              <option value="donor">Donor</option>
              <option value="volunteer">Volunteer</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="username">Username</label>
            <div className="input-container">
              <span className="input-icon">👤</span>
              <input
                id="username"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="input-container">
              <span className="input-icon">🔒</span>
              <input
                id="password"
                type="password"
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <div className="input-container">
              <span className="input-icon">🔒</span>
              <input
                id="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="location">Your Location</label>
            <div className="input-container">
              <span className="input-icon">📍</span>
              <input
                id="location"
                type="text"
                placeholder="Enter your city or area"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="profilePhoto">Profile Photo</label>
            <input
              id="profilePhoto"
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              required
            />
          </div>

          <button type="submit" className="login-button">
            Register
          </button>
        </form>

        <div className="login-footer">
          <p>Already have an account?</p>
          <Link to="/login" className="register-link">
            Login
          </Link>
        </div>
      </div>

      <div className="login-background">
        <div className="login-background-content">
          <h2>Together We Can Make a Difference</h2>
          <p>Register now and start making an impact in your community.</p>
        </div>
      </div>
    </div>
  );
}

export default Register;
