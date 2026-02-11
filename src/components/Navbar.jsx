import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MenuIcon, User, X, Activity, LogOut, LogIn, Calendar } from 'lucide-react';
import { auth } from '../../firebase.config';
import { signOut, getAuth } from 'firebase/auth';
import toast from 'react-hot-toast';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const user = getAuth()

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
  const signIn = () => {
    navigate('/signUp')
  }

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
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white transition-transform group-hover:scale-105 shadow-lg shadow-slate-200">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
          <h1 className="text-slate-900 font-black text-xl tracking-tighter uppercase">
            Health<span className="text-blue-600">Core</span>
          </h1>
        </Link>

        {/* ACTIONS */}
        <div className="flex items-center gap-4">


          {/* PROFILE DROPDOWN WRAPPER */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center gap-3 p-1.5 md:pl-4 md:bg-blue-600 rounded-2xl md:hover:scale-105 transition-all md:shadow-xl shadow-slate-200 active:scale-95 md:border-2 md:border-transparent md:focus:border-blue-500"
            >
              <span className="text-[13px] hidden md:block font-bold text-white tracking-tight">Account</span>
              <div className="w-8 h-8 bg-white/10 hover:scale-110 text-black md:text-white rounded-xl flex items-center justify-center">
                {isOpen ? <X size={16} /> : <MenuIcon size={16} strokeWidth={2.5} />}
              </div>
            </button>

            {/* THE DROPDOWN BLOCK */}
            {isOpen && (
              <div className="absolute zoomIN right-0 mt-3 w-56 bg-white border border-slate-100 rounded-[2rem] shadow-2xl shadow-slate-200 p-2 animate-in fade-in zoom-in-95 duration-200">
                <div className="px-4 py-3 border-b border-slate-50 mb-1">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Quick Access</p>
                </div>

                {user.currentUser && (
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
                )}


                {user.currentUser && (
                  <Link
                    to="/appointments"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 p-3 hover:bg-slate-50 rounded-2xl text-slate-700 transition-colors group"
                  >
                    <div className="p-2 bg-blue-50 text-blue-600 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      <Calendar size={16} />
                    </div>
                    <span className="text-sm font-bold">Appointments</span>
                  </Link>

                )}


                <button
                  onClick={user.currentUser ? (handleLogout) : (signIn)}
                  className={`w-full flex items-center gap-3 p-3 transition-colors group ${user.currentUser ? 'hover:bg-red-50 rounded-2xl text-red-500' : 'hover:bg-blue-50 rounded-2xl text-blue-500'} `}
                >
                  <div className={`p-2  group-hover:text-white transition-colors ${user.currentUser ? 'bg-red-50 text-red-500 rounded-lg group-hover:bg-red-500' : 'bg-blue-50 text-blue-500 rounded-lg group-hover:bg-blue-500'} `}>
                    {user.currentUser ? <LogOut size={16} /> : <LogIn size={16} />}
                  </div>
                  <span className="text-sm font-bold">{user.currentUser ? 'Logout' : 'Sign Up'}</span>
                </button>
              </div>
            )}
          </div>
        </div>

      </div>
    </nav>
  );
}