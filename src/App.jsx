// // src/App.jsx
// import React from "react";
// import { Routes, Route } from "react-router-dom";
// import Navbar from "./components/Navbar";
// import Footer from "./components/Footer";
// import Home from "./pages/Home";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// // import Gallery from "./pages/Gallery";
// import DonorDashboard from "./pages/DonorDashboard";
// import VolunteerDashboard from "./pages/VolunteerDashboard";

// function App() {
//   return (
//     <>
//       <Navbar />
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />
//         {/* <Route path="/gallery" element={<Gallery />} /> */}
//         <Route path="/donor-dashboard" element={<DonorDashboard />} />
//         <Route path="/volunteer-dashboard" element={<VolunteerDashboard />} />
//       </Routes>
//       <Footer />
//     </>
//   );
// }

// export default App;


// src/App.jsx
import React, { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import DonorDashboard from "./pages/DonorDashboard";
import VolunteerDashboard from "./pages/VolunteerDashboard";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  const handleLogin = (user) => {
    setCurrentUser(user);
    if (user.role === "donor") navigate("/donor-dashboard");
    else if (user.role === "volunteer") navigate("/volunteer-dashboard");
  };

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/donor-dashboard"
          element={
            currentUser && currentUser.role === "donor" ? (
              <DonorDashboard user={currentUser} />
            ) : (
              <h2>Access denied. Only donors can view this page.</h2>
            )
          }
        />
        <Route
          path="/volunteer-dashboard"
          element={
            currentUser && currentUser.role === "volunteer" ? (
              <VolunteerDashboard user={currentUser} />
            ) : (
              <h2>Access denied. Only volunteers can view this page.</h2>
            )
          }
        />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
