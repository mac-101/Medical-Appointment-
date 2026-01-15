import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import Home from './pages/home.jsx'
import ProfileId from './pages/profile_id.jsx'
import Search from './pages/search.jsx'
import Appointment from './pages/appointment.jsx'
import Profile from './pages/profile.jsx'
import Register from './pages/register.jsx'
import ScrollToTop from './components/ScrollTop.jsx'

// IMPORT LAYOUT COMPONENTS
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'

// 1. Create a "Wrapper" or move the logic into a sub-component
function AppContent() {
  const location = useLocation();

  // 2. Logic for dynamic paths: Use .startsWith() for profiles
  const isProfilePage = location.pathname.startsWith('/profile/');
  const isSignupPage = location.pathname === '/signup';
  
  const shouldHideFooter = isProfilePage || isSignupPage;

  return (
    <div className="App min-h-screen flex flex-col">
      <Navbar />
      <main className="grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile/:id" element={<ProfileId />} />
          <Route path="/search" element={<Search />} />
          <Route path="/appointments" element={<Appointment />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/signup" element={<Register />} />
        </Routes>
      </main>
      {!shouldHideFooter && <Footer />}
      {/* Don't forget your MobileNav here if you want it! */}
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