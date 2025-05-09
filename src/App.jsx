// // src/App.jsx
// import React, { useState } from "react";
// import { Routes, Route, useNavigate } from "react-router-dom";
// import Navbar from "./components/Navbar";
// import Footer from "./components/Footer";
// import Gallery from "./pages/Gallery"; 
// import Home from "./pages/Home";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import DonorDashboard from "./pages/DonorDashboard";
// import VolunteerDashboard from "./pages/VolunteerDashboard";
// import ChooseDonation from "./pages/ChooseDonation";
// import Logout from "./pages/Logout";

// function App() {
//   const [currentUser, setCurrentUser] = useState(null);
//   const navigate = useNavigate();

//   const handleLogin = (user) => {
//     setCurrentUser(user);
//     if (user.role === "donor") navigate("/donor-dashboard");
//     else if (user.role === "volunteer") navigate("/volunteer-dashboard");
//   };

  

//   return (
//     <>
//       <Navbar />
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/login" element={<Login onLogin={handleLogin} />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/choose-donation" element={<ChooseDonation />} />
//         {/* <Route path="/gallery" element={<Gallery />} /> */}

//         <Route path="/gallery" element={<Gallery currentUser={currentUser} />} />
//         <Route
//           path="/donor-dashboard"
//           element={
//             currentUser && currentUser.role === "donor" ? (
//               <DonorDashboard user={currentUser} />
//             ) : (
//               <h2>Access denied. Only donors can view this page.</h2>
//             )
//           }
//         />
//         <Route
//           path="/volunteer-dashboard"
//           element={
//             currentUser && currentUser.role === "volunteer" ? (
//               <VolunteerDashboard user={currentUser} />
//             ) : (
//               <h2>Access denied. Only volunteers can view this page.</h2>
//             )
//           }
//         />
        
//         <Route 
//               path="/logout" 
//               element={
//                 <Logout onLogout={handleLogout} />
//               } 
//             />
//       </Routes>
//       <Footer />
//     </>
//   );
// }

// export default App;




// src/App.jsx
// import React, { useState, useEffect } from "react";
// import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
// import Navbar from "./components/Navbar";
// import Footer from "./components/Footer";
// import Gallery from "./pages/Gallery"; 
// import Home from "./pages/Home";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import DonorDashboard from "./pages/DonorDashboard";
// import VolunteerDashboard from "./pages/VolunteerDashboard";
// import ChooseDonation from "./pages/ChooseDonation";
// import Logout from "./pages/Logout";

// function App() {
//   const [currentUser, setCurrentUser] = useState(null);
//   const navigate = useNavigate();

//   // Check for stored user on initial load
//   useEffect(() => {
//     const storedUser = localStorage.getItem("kindShareUser");
//     if (storedUser) {
//       try {
//         setCurrentUser(JSON.parse(storedUser));
//       } catch (e) {
//         console.error("Error parsing stored user data");
//         localStorage.removeItem("kindShareUser");
//       }
//     }
//   }, []);

//   const handleLogin = (user) => {
//     setCurrentUser(user);
//     localStorage.setItem("kindShareUser", JSON.stringify(user));
//     if (user.role === "donor") navigate("/donor-dashboard");
//     else if (user.role === "volunteer") navigate("/volunteer-dashboard");
//   };

//   const handleLogout = () => {
//     setCurrentUser(null);
//     localStorage.removeItem("kindShareUser");
//     navigate("/");
//   };

//   // Protected route component
//   const ProtectedRoute = ({ children, redirectTo = "/login" }) => {
//     if (!currentUser) {
//       return <Navigate to={redirectTo} replace />;
//     }
//     return children;
//   };

//   // Role-based route component
//   const RoleRoute = ({ role, children, redirectTo = "/" }) => {
//     if (!currentUser || currentUser.role !== role) {
//       return <Navigate to={redirectTo} replace />;
//     }
//     return children;
//   };

//   return (
//     <>
//       <Navbar user={currentUser} />
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route 
//           path="/login" 
//           element={currentUser ? <Navigate to="/" replace /> : <Login onLogin={handleLogin} />} 
//         />
//         <Route 
//           path="/register" 
//           element={currentUser ? <Navigate to="/" replace /> : <Register />} 
//         />
//         <Route path="/gallery" element={<Gallery currentUser={currentUser} />} />
//         <Route 
//           path="/choose-donation" 
//           element={
//             <ProtectedRoute>
//               <ChooseDonation />
//             </ProtectedRoute>
//           } 
//         />
//         <Route 
//           path="/donor-dashboard" 
//           element={
//             <RoleRoute role="donor">
//               <DonorDashboard user={currentUser} />
//             </RoleRoute>
//           } 
//         />
//         <Route 
//           path="/volunteer-dashboard" 
//           element={
//             <RoleRoute role="volunteer">
//               <VolunteerDashboard user={currentUser} />
//             </RoleRoute>
//           } 
//         />
//         <Route 
//           path="/logout" 
//           element={
//             <Logout onLogout={handleLogout} />
//           } 
//         />
//       </Routes>
//       <Footer />
//     </>
//   );
// }

// export default App;



// src/App.jsx
import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Gallery from "./pages/Gallery";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import DonorDashboard from "./pages/DonorDashboard";
import VolunteerDashboard from "./pages/VolunteerDashboard";
import ChooseDonation from "./pages/ChooseDonation";
import Logout from "./pages/Logout";
import DonateCash from "./pages/DonateCash"; // Import DonateCash component
import LearnMore from "./pages/LearnMore"; //

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  // Check for stored user on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem("kindShareUser");
    if (storedUser) {
      try {
        setCurrentUser(JSON.parse(storedUser));
      } catch (e) {
        console.error("Error parsing stored user data");
        localStorage.removeItem("kindShareUser");
      }
    }
  }, []);

  const handleLogin = (user) => {
    setCurrentUser(user);
    localStorage.setItem("kindShareUser", JSON.stringify(user));
    if (user.role === "donor") navigate("/donor-dashboard");
    else if (user.role === "volunteer") navigate("/volunteer-dashboard");
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem("kindShareUser");
    navigate("/");
  };

  // Protected route component
  const ProtectedRoute = ({ children, redirectTo = "/login" }) => {
    if (!currentUser) {
      return <Navigate to={redirectTo} replace />;
    }
    return children;
  };

  // Role-based route component
  const RoleRoute = ({ role, children, redirectTo = "/" }) => {
    if (!currentUser || currentUser.role !== role) {
      return <Navigate to={redirectTo} replace />;
    }
    return children;
  };

  return (
    <>
      <Navbar user={currentUser} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/learn-more" element={<LearnMore />} />

        <Route
          path="/login"
          element={currentUser ? <Navigate to="/" replace /> : <Login onLogin={handleLogin} />}
        />
        <Route
          path="/register"
          element={currentUser ? <Navigate to="/" replace /> : <Register />}
        />
        <Route path="/gallery" element={<Gallery currentUser={currentUser} />} />
        <Route
          path="/choose-donation"
          element={
            <ProtectedRoute>
              <ChooseDonation />
            </ProtectedRoute>
          }
        />
        <Route
          path="/donor-dashboard"
          element={
            <RoleRoute role="donor">
              <DonorDashboard user={currentUser} />
            </RoleRoute>
          }
        />
        <Route
          path="/volunteer-dashboard"
          element={
            <RoleRoute role="volunteer">
              <VolunteerDashboard user={currentUser} />
            </RoleRoute>
          }
        />
        <Route
          path="/logout"
          element={
            <Logout onLogout={handleLogout} />
          }
        />
        {/* Add the new route for DonateCash */}
        <Route
          path="/donate-cash"
          element={
            <ProtectedRoute>
              <DonateCash />
            </ProtectedRoute>
          }
        />
        
      </Routes>
      <Footer />
    </>
  );
}

export default App;
