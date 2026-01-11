import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './pages/home.jsx'
import Profile from './pages/profile_id.jsx'
import Search from './pages/search.jsx'
import DashboardPatient from './pages/dashboard_patient.jsx'
import DashboardProvider from './pages/dashboard_Provider.jsx'
import SignUp from '.pages/registration.jsx'

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/search" element={<Search />} />
          <Route path="/dashboard/patient" element={<DashboardPatient />} />
          <Route path="/dashboard/provider" element={<DashboardProvider />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}
export default App