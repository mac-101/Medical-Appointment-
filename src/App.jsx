import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {useLocation} from 'react-router-dom';
import Home from "./pages/home.jsx";
import ProfileId from "./pages/profile_id.jsx";
import Search from "./pages/search.jsx";
import Appointment from "./pages/appointment.jsx";
import Profile from "./pages/profile.jsx";
// import Register from "./pages/register.jsx";
import SignupPage from "./Authentcation/SignUp.jsx";
import LoginPage from "./Authentcation/LoginIn.jsx";
import ScrollToTop from './components/ScrollTop.jsx'
import FirstPage from "./componentPages/OnBoarding.jsx";

// IMPORT LAYOUT COMPONENTS 
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'

// 1. Create a "Wrapper" or move the logic into a sub-component
function AppContent() {
  const location = useLocation();

  // 2. Logic for dynamic paths: Use .startsWith() for profiles
  const isProfilePage = location.pathname.startsWith('/profile/');
  const landing = location.pathname === '/landingPage';
  const isSignupPage = location.pathname === '/signup' || location.pathname === '/signUp' || location.pathname === '/landingpage';
  const isSearchPage = location.pathname === '/search' || location.pathname === '/appointments';
  
  const shouldHideFooter = isProfilePage || isSignupPage;
  const shouldHideNavbar = isSearchPage || isSignupPage || landing;

  return (
    <div className="App min-h-screen flex flex-col">
      {!shouldHideNavbar && <Navbar />}
      <main className="grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile/:id" element={<ProfileId />} />
          <Route path="/search" element={<Search />} />
          <Route path="/appointments" element={<Appointment />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/landingpage" element={<FirstPage />} />
           <Route path="/signup" element={<SignupPage />} />
        </Routes>
      </main>
      {!shouldHideFooter && <Footer />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <AppContent /> {/* Now useLocation works because it's INSIDE Router */}
    </Router>
  );
}

export default App;
