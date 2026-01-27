import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { MapPin, Award, Star, ShieldCheck, Share2, Check, LayoutDashboard, MessageSquare } from 'lucide-react';
import { db } from '../../firebase.config'; // Ensure path is correct
import {ref, get } from 'firebase/database';

// Components
import Reviews from '../componentPages/Reviews';
import AppointmentBooking from '../components/AppointmentBooking';
import Departments from '../Data/Department';

function ProfileId() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('reviews');
  const [booking, setBooking] = useState(false);

  const isHospital = location.pathname.includes('hospital');
  const specialistType = isHospital ? 'hospital' : 'doctor';

  // 1. FETCH REAL DATA FROM FIREBASE
  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const userRef = ref(db, `users/${id}`);
        const snapshot = await get(userRef);
        if (snapshot.exists()) {
          setProfileData(snapshot.val());
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white">
         <div className="flex space-x-2">
            <div className="w-4 h-4 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
            <div className="w-4 h-4 bg-blue-400 rounded-full animate-bounce"></div>
         </div>
         <p className="mt-4 text-blue-600 font-bold text-xs uppercase tracking-widest">Loading Profile...</p>
      </div>
    );
  }

  if (!profileData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <h2 className="text-[#0f172a] font-black text-2xl uppercase tracking-tighter">Provider Not Found</h2>
          <button onClick={() => navigate(-1)} className="mt-4 text-blue-500 font-bold uppercase text-xs tracking-widest underline">Go Back</button>
        </div>
      </div>
    );
  }

  // Consistent data formatting
  const displayData = {
    name: profileData.name,
    specialty: isHospital ? "Multi-Specialty Care" : profileData.specialty,
    rating: profileData.rating || "5.0",
    experience: isHospital ? profileData.location : (profileData.experience || "12+ Years Experience"),
    image: profileData.image?.url || "https://via.placeholder.com/400x300",
    bio: profileData.bio || (isHospital 
      ? `State-of-the-art medical facility located in ${profileData.location}.`
      : `Dr. ${profileData.name} is a leading specialist focused on patient-centered recovery.`)
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20 font-sans">
      {/* HEADER SECTION */}
      <div className="sticky top-0 z-30 w-full bg-white/80 backdrop-blur-md border-b border-gray-100/80">
        <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate(-1)} className="p-2 hover:bg-slate-100 rounded-full text-slate-400 transition-colors">
              <ArrowLeftIcon />
            </button>
            <div>
              <h2 className="font-black uppercase tracking-tighter text-xl text-[#0f172a] leading-none">
                {isHospital ? "Hospital Detail" : "Doctor Profile"}
              </h2>
              <div className="flex items-center gap-1.5 mt-1">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">TrustCore Verified</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 rounded-xl border border-blue-100">
              <ShieldCheck size={18} className="text-blue-600" />
              <span className="hidden md:inline text-[10px] font-black text-blue-700 uppercase tracking-tighter">Verified</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* PROFILE CARD */}
          <div className="lg:col-span-1">
            <div className="bg-white sticky top-24 border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
              <div className="aspect-[4/3] relative overflow-hidden">
                <img src={displayData.image} alt={displayData.name} className="w-full h-full object-cover" />
                <div className="absolute top-4 left-4 bg-[#0f172a]/80 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
                  <div className="flex items-center gap-1.5 text-yellow-400">
                    <Star size={12} fill="currentColor" />
                    <span className="text-xs font-black text-white">{displayData.rating}</span>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <span className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em] bg-blue-50 px-2 py-1 rounded">
                  {displayData.specialty}
                </span>
                <h1 className="text-2xl font-black text-[#0f172a] uppercase tracking-tighter mt-3 leading-tight">
                  {displayData.name}
                </h1>
                
                <div className="flex items-center gap-2 mt-4 text-slate-500">
                  {isHospital ? <MapPin size={16} className="text-blue-500"/> : <Award size={16} className="text-blue-500"/>}
                  <span className="text-xs font-bold uppercase tracking-wide truncate">{displayData.experience}</span>
                </div>

                <p className="mt-6 text-slate-600 text-sm leading-relaxed">
                  {displayData.bio}
                </p>

                <button
                  onClick={() => setBooking(true)}
                  className="w-full mt-8 bg-blue-600 text-white py-4 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-[#0f172a] transition-all flex items-center justify-center gap-2 shadow-xl shadow-blue-500/10"
                >
                  Book Appointment <Check size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* CONTENT TABS */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
              <div className="flex bg-slate-50/50 border-b border-slate-100 p-2">
                <button
                  onClick={() => setActiveTab('reviews')}
                  className={`flex-1 py-3 flex items-center justify-center gap-2 font-black uppercase text-[10px] tracking-widest transition-all rounded-xl
                    ${activeTab === 'reviews' ? 'bg-white text-[#0f172a] shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                >
                  <MessageSquare size={14} /> Reviews
                </button>
                {isHospital && (
                  <button
                    onClick={() => setActiveTab('department')}
                    className={`flex-1 py-3 flex items-center justify-center gap-2 font-black uppercase text-[10px] tracking-widest transition-all rounded-xl
                      ${activeTab === 'department' ? 'bg-white text-[#0f172a] shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                  >
                    <LayoutDashboard size={14} /> Departments
                  </button>
                )}
              </div>

              <div className="p-6 md:p-8">
                {activeTab === 'reviews' ? (
                  <Reviews targetId={id} />
                ) : (
                  <Departments />
                )}
              </div>
            </div>
          </div>

        </div>
      </div>

      {booking && <AppointmentBooking onClose={() => setBooking(false)} specialistType={specialistType} />}
    </div>
  );
}

const ArrowLeftIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
);

export default ProfileId;