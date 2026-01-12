import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, Menu, X, Home, Search, Calendar } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  // Function to close menu when a link is clicked
  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/" onClick={closeMenu} className="text-2xl font-bold text-blue-600">
          HealthCore
        </Link>
        
        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">Home</Link>
          <Link to="/search" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">Find Doctors</Link>
          <Link to="/appointments" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">Appointments</Link>
        </div>

        {/* Right Side: Profile & Burger */}
        <div className="flex items-center gap-2">
          <Link to="/profile" onClick={closeMenu} className="p-2 bg-blue-50 text-blue-600 rounded-full hover:bg-blue-100 transition-colors">
            <User size={20} />
          </Link>

          {/* Burger Icon (Mobile Only) */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 animate-in fade-in slide-in-from-top-5 duration-300">
          <div className="flex flex-col p-4 space-y-4">
            <Link 
              to="/" 
              onClick={closeMenu} 
              className="flex items-center gap-3 p-3 text-gray-600 hover:bg-blue-50 hover:text-blue-600 rounded-xl font-medium transition-all"
            >
              <Home size={18} /> Home
            </Link>
            <Link 
              to="/search" 
              onClick={closeMenu} 
              className="flex items-center gap-3 p-3 text-gray-600 hover:bg-blue-50 hover:text-blue-600 rounded-xl font-medium transition-all"
            >
              <Search size={18} /> Find Doctors
            </Link>
            <Link 
              to="/appointments" 
              onClick={closeMenu} 
              className="flex items-center gap-3 p-3 text-gray-600 hover:bg-blue-50 hover:text-blue-600 rounded-xl font-medium transition-all"
            >
              <Calendar size={18} /> Appointments
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}