import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './pages/home.jsx'
import ProfileId from './pages/profile_id.jsx'
import Search from './pages/search.jsx'
import Appointment from './pages/appointment.jsx'
import Profile from './pages/profile.jsx'
import Register from './pages/register.jsx'

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile/:id" element={<ProfileId />} />
          <Route path="/search" element={<Search />} />
          <Route path="/appointments" element={<Appointment />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/signup" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
}
export default App