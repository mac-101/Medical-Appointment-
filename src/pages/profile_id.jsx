import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { MapPin, LogOut, Calendar, User, X, MenuIcon, Check, Clock, ArrowLeft, Loader2 } from 'lucide-react';
import { db } from '../../firebase.config';
import { ref, get } from 'firebase/database';
import { Link } from 'react-router-dom';
import { auth } from '../../firebase.config';
import { signOut } from 'firebase/auth';
import toast from 'react-hot-toast';
import AppointmentBooking from '../components/AppointmentBooking';

export default function ProfileId() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState(false);
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success("Signed out successfully");
      navigate('/');
    } catch (error) {
      toast.error("Error signing out");
    }
  };


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const snapshot = await get(ref(db, `users/${id}`));
        if (snapshot.exists()) setProfile({ ...snapshot.val(), uid: id });
      } catch (e) { console.error(e); }
      setLoading(false);
    })();
  }, [id]);

  if (loading) return (
    <div className="h-screen flex items-center justify-center bg-white">
      <Loader2 className="animate-spin text-blue-600" size={32} />
    </div>
  );

  if (!profile) return (
    <div className="h-screen flex flex-col items-center justify-center">
      <h2 className="font-black uppercase tracking-tighter text-slate-900">Provider Not Found</h2>
      <button onClick={() => navigate(-1)} className="mt-4 text-blue-600 font-bold uppercase text-[10px] tracking-widest">Go Back</button>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50/50 pb-20 font-sans">
      {/* 1. MINIMAL HEADER */}
      <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
            <ArrowLeft size={24} />
          </button>
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

      <main className="max-w-5xl mx-auto py-5 px-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-8">

          {/* LEFT: IMAGE & STATS */}
          <div className="md:col-span-7">
            <div className="bg-white p-4 rounded-4xl border border-slate-50 hover:border-blue-100 hover:shadow-[0_20px_50px_rgba(8,112,184,0.08)] transition-all duration-500">
              <img
                src={profile.image?.url || "https://api.dicebear.com/9.x/avataaars/svg?seed=leah"}
                className="w-full aspect-square object-cover rounded-[1.5rem]"
                alt=""
              />
              <div className="mt-6 flex justify-between items-center px-2">
                <div>
                  <span className="text-[10px] roboto-font font-black text-blue-600 uppercase tracking-widest">{profile.specialty || 'Medical Specialist'}</span>
                  <h1 className="text-3xl font-black text-slate-900 font mt-1">Dr. {profile.name || profile.fullName}</h1>
                </div>

              </div>
              <p className="text-slate-600 font-medium leading-relaxed">
                {profile.bio || `Certified health professional dedicated to quality patient care at ${profile.location || 'our facility'}.`}
              </p>


              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="bg-slate-50 p-4 rounded-2xl">
                  <div className="flex items-center gap-2 text-slate-400 font-bold text-[9px] uppercase tracking-widest mb-2">
                    <MapPin size={14} /> Practice Location
                  </div>
                  <span className="text-sm font-black text-slate-900">{profile.hospital} {profile.location || 'Lagos, Nigeria'}</span>
                </div>
                <div className="bg-slate-50 p-4 rounded-2xl">
                  <div className="flex items-center gap-2 text-slate-400 font-bold text-[9px] uppercase tracking-widest mb-2">
                    <Clock size={14} /> Available Hours
                  </div>
                  <span className="text-sm font-black text-slate-900">08:00 AM - 05:00 PM</span>
                </div>
              </div>

              <button
                onClick={() => setBooking(true)}
                className="w-full md:hidden mt-10 bg-blue-600 text-white py-6 rounded-3xl text-xs font-black font hover:bg-slate-900 transition-all shadow-2xl shadow-blue-200 active:scale-95 flex items-center justify-center gap-3"
              >
                Book Appointment <Check size={18} />
              </button>
            </div>
          </div>

          {/* RIGHT: INFO & BOOKING */}
          <div className="hidden md:block md:col-span-5 space-y-6">
            <AppointmentBooking
              onClose={() => setBooking(false)}
              specialistType="doctor"
              specialistId={id}
              specialistData={profile}
            />
          </div>
        </div>
      </main>

      {/* MODAL */}
      {booking && (
        <AppointmentBooking
          onClose={() => setBooking(false)}
          specialistType="doctor"
          specialistId={id}
          specialistData={profile}
        />
      )}
    </div>
  );
}