import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home.jsx";
import ProfileId from "./pages/profile_id.jsx";
import Search from "./pages/search.jsx";
import Appointment from "./pages/appointment.jsx";
import Profile from "./pages/profile.jsx";
import Register from "./pages/register.jsx";
import SignupPage from "./Authentcation/SignUp.jsx";
import LoginPage from "./Authentcation/LoginIn.jsx";

// IMPORT LAYOUT COMPONENTS 
// import Navbar from './components/Navbar.jsx'
// import Footer from './components/Footer.jsx'

function App() {
  return (
    <Router>
      <div className="App min-h-screen flex flex-col bg-gray-50">
        {/* Header shows on all pages */}
        {/* <Navbar /> */}

        {/* Dynamic Page Content */}
        <main className="grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile/:id" element={<ProfileId />} />
            <Route path="/search" element={<Search />} />
            <Route path="/appointments" element={<Appointment />} />
            <Route path="/profile" element={<Profile />} />
            {/* <Route path="/signup" element={<Register />} /> */}
            <Route path="/signup/patient" element={<SignupPage />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </main>

        {/* Footer shows on all pages */}
        {/* <Footer /> */}
      </div>
    </Router>
  );
}

export default App;
