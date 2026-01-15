import React from 'react';
import { Link } from 'react-router-dom';
import { User, Bell } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        
        {/* Logo - Always visible */}
        <Link to="/" className="text-xl font-black text-blue-600 tracking-tighter flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white text-sm">H</div>
          <span>HealthCore</span>
        </Link>
        
        {/* Desktop Links - Hidden on Mobile */}
        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-blue-600 transition-colors">Home</Link>
          <Link to="/search" className="text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-blue-600 transition-colors">Find Doctors</Link>
          <Link to="/appointments" className="text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-blue-600 transition-colors">Appointments</Link>
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center gap-3">
          {/* Notification Icon - Nice "Texture" for mobile top bar */}
          <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors relative">
            <Bell size={20} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 border-2 border-white rounded-full"></span>
          </button>

          {/* Profile Link - Hidden on Mobile because it's in your Bottom Nav */}
          <Link 
            to="/profile" 
            className="hidden md:flex items-center gap-2 p-1 pr-4 bg-gray-50 rounded-full hover:bg-blue-50 transition-all border border-gray-100"
          >
            <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-md">
              <User size={16} />
            </div>
            <span className="text-xs font-black text-gray-700 uppercase tracking-tighter">My Account</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}