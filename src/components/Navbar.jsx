import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Bell, Activity, LogOut, ChevronDown, Settings } from 'lucide-react';
import { auth } from '../../firebase.config';
import { signOut } from 'firebase/auth';
import toast from 'react-hot-toast';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Handle Logout Logic
  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success("Signed out successfully");
      navigate('/');
    } catch (error) {
      toast.error("Error signing out");
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="bg-white/90 backdrop-blur-xl border-b border-slate-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* LOGO */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center text-white transition-transform group-hover:scale-105 shadow-lg shadow-slate-200">
            <Activity size={20} strokeWidth={3} />
          </div>
          <h1 className="text-slate-900 font-black text-xl tracking-tighter uppercase">
            Health<span className="text-blue-600">Core</span>
          </h1>
        </Link>

        {/* ACTIONS */}
        <div className="flex items-center gap-4">
          <button className="p-3 text-slate-400 hover:text-slate-900 hover:bg-slate-50 rounded-2xl transition-all relative">
            <Bell size={20} />
            <span className="absolute top-3.5 right-3.5 w-2.5 h-2.5 bg-blue-600 border-2 border-white rounded-full"></span>
          </button>

          {/* PROFILE DROPDOWN WRAPPER */}
          <div className="relative" ref={dropdownRef}>
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="hidden md:flex items-center gap-3 p-1.5 pr-4 bg-slate-900 rounded-2xl hover:bg-slate-800 transition-all shadow-xl shadow-slate-200 active:scale-95 border-2 border-transparent focus:border-blue-500"
            >
              <div className="w-8 h-8 bg-white/10 text-white rounded-xl flex items-center justify-center">
                <User size={16} strokeWidth={2.5} />
              </div>
              <span className="text-[13px] font-bold text-white tracking-tight">Account</span>
              <ChevronDown size={14} className={`text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* THE DROPDOWN BLOCK */}
            {isOpen && (
              <div className="absolute right-0 mt-3 w-56 bg-white border border-slate-100 rounded-[2rem] shadow-2xl shadow-slate-200 p-2 animate-in fade-in zoom-in-95 duration-200">
                <div className="px-4 py-3 border-b border-slate-50 mb-1">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Quick Access</p>
                </div>
                
                <Link 
                  to="/profile" 
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 p-3 hover:bg-slate-50 rounded-2xl text-slate-700 transition-colors group"
                >
                  <div className="p-2 bg-blue-50 text-blue-600 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <User size={16} />
                  </div>
                  <span className="text-sm font-bold">Dashboard</span>
                </Link>

                <button 
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 p-3 hover:bg-red-50 rounded-2xl text-red-500 transition-colors group"
                >
                  <div className="p-2 bg-red-50 text-red-500 rounded-lg group-hover:bg-red-500 group-hover:text-white transition-colors">
                    <LogOut size={16} />
                  </div>
                  <span className="text-sm font-bold">Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>

      </div>
    </nav>
  );
}