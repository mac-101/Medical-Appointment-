import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import Home from "./pages/home.jsx";
import ProfileId from "./pages/profile_id.jsx";
import Search from "./pages/search.jsx";
import Emergency from "./pages/emergency.jsx"
import Appointment from "./pages/appointment.jsx";
import Profile from "./pages/profile.jsx";
import SignupPage from "./Authentcation/SignUp.jsx";
import ScrollToTop from './components/ScrollTop.jsx'
import FirstPage from "./componentPages/OnBoarding.jsx";
import ProtectedRoute from "./services/protectedRoute.jsx";
import { AuthProvider } from "./services/useAuthContext.jsx";
import { Toaster } from "react-hot-toast";

// IMPORT LAYOUT COMPONENTS 
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'

// 1. Create a "Wrapper" or move the logic into a sub-component
function AppContent() {
  const location = useLocation();

  // 2. Logic for dynamic paths: Use .startsWith() for profiles
  const isProfilePage = location.pathname.startsWith('/doctor/') || location.pathname.startsWith('/hospital/');
  const landing = location.pathname === '/landingPage';
  const isSignupPage = location.pathname === '/signup' || location.pathname === '/signUp' || location.pathname === '/landingpage' || location.pathname === '/login';
  const isSearchPage = location.pathname === '/search' || location.pathname === '/appointments';

  const shouldHideFooter = isProfilePage || isSignupPage || landing;
  const shouldHideNavbar = isSearchPage || isSignupPage || landing || isProfilePage;

  return (
    <div className="App min-h-screen flex flex-col">
      <Toaster/>
      {!shouldHideNavbar && <Navbar />}
      <main className="grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/appointments" element={
            <ProtectedRoute>
              <Appointment />
            </ProtectedRoute>} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route path="/landingpage" element={<FirstPage />} />
          <Route path="/emergency" element={<Emergency />} />
          <Route path='/login' element={<SignupPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/doctor/:id" element={<ProfileId />} />
          <Route path="/hospital/:id" element={<ProfileId />} />
        </Routes>
      </main>
      {!shouldHideFooter && <Footer />}
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <AppContent /> {/* Now useLocation works because it's INSIDE Router */}
      </Router>
    </AuthProvider>
  );
}

export default App;
