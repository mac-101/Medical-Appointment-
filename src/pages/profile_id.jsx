import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { MapPin, Star, ShieldCheck, Check, LayoutDashboard, MessageSquare, Clock, ArrowLeft } from 'lucide-react';
import { db } from '../../firebase.config';
import { ref, get } from 'firebase/database';

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

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const userRef = ref(db, `users/${id}`);
        const snapshot = await get(userRef);
        if (snapshot.exists()) {
          setProfileData({ ...snapshot.val(), uid: id });
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [id]);

  // FIX: Added return statement to InlineLoading
  const InlineLoading = () => (
    <div className="flex justify-center items-center py-20 space-x-2">
      <div className="w-4 h-4 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
      <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
      <div className="w-4 h-4 bg-blue-400 rounded-full animate-bounce"></div>
    </div>
  );

  if (loading) return <InlineLoading />;

  if (!profileData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <h2 className="text-[#0f172a] font-black text-2xl uppercase tracking-tighter">Provider Not Found</h2>
          <button onClick={() => navigate(-1)} className="mt-4 text-blue-500 font-bold uppercase text-xs tracking-widest underline italic">
            Go Back
          </button>
        </div>
      </div>
    );
  }

  // Consistent data formatting
  const displayData = {
    name: profileData.name || profileData.fullName,
    specialty: isHospital ? "Multi-Specialty Care" : (profileData.specialty || "General Practitioner"),
    rating: profileData.rating || "5.0",
    experience: isHospital ? profileData.location : (profileData.experience || "Medical Specialist"),
    image: profileData.image?.url || "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=1200",
    bio: profileData.bio || (isHospital
      ? `High-quality care center located in ${profileData.location || 'our facility'}.`
      : `Dr. ${profileData.name || 'Provider'} is a certified health professional dedicated to patient care.`),
    availableDays: profileData.availableDays || ["Mon", "Tue", "Wed", "Thu", "Fri"],
    availabilityTime: profileData.availabilityTime || { start: "08:00", end: "17:00" }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 pb-20 font-sans">
      {/* HEADER SECTION */}
      <div className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate(-1)} className="p-2 hover:bg-slate-100 rounded-full text-slate-600 transition-colors">
              <ArrowLeft size={24} strokeWidth={2.5} />
            </button>
            <h2 className="font-black uppercase tracking-tighter text-xl text-[#0f172a]">
              {isHospital ? "Facility Profile" : "Physician Profile"}
            </h2>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 rounded-xl border border-green-100">
            <ShieldCheck size={16} className="text-green-600" />
            <span className="text-[10px] font-black text-green-700 uppercase">Trust Verified</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* LEFT COLUMN: PROFILE CARD */}
          <div className="lg:col-span-1">
            <div className="bg-white sticky top-28 rounded-3xl overflow-hidden shadow-sm border border-slate-100">
              <div className="aspect-[4/5] relative overflow-hidden">
                <img src={displayData.image} alt={displayData.name} className="w-full h-full object-cover" />
                <div className="absolute top-4 left-4 bg-[#0f172a]/80 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
                  <div className="flex items-center gap-1.5 text-yellow-400">
                    <Star size={12} fill="currentColor" />
                    <span className="text-xs font-black text-white">{displayData.rating}</span>
                  </div>
                </div>
              </div>

              <div className="p-8">
                <span className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em] bg-blue-50 px-2 py-1 rounded">
                  {displayData.specialty}
                </span>
                <h1 className="text-3xl font-black text-[#0f172a] uppercase tracking-tighter mt-3 leading-tight">
                  {displayData.name}
                </h1>

                <div className="flex items-center gap-2 mt-4 text-slate-500">
                  <MapPin size={16} className="text-blue-500" />
                  <span className="text-xs font-bold uppercase tracking-wide truncate">{displayData.experience}</span>
                </div>

                <p className="mt-6 text-slate-500 text-sm leading-relaxed font-medium">
                  {displayData.bio}
                </p>

                <div className="mt-8 pt-8 border-t border-slate-50 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-slate-400 font-bold text-[10px] uppercase tracking-widest">
                      <Clock size={14} /> Available Hours
                    </div>
                    <span className="text-xs font-black text-blue-600 bg-blue-50 px-2 py-1 rounded-lg">
                      {displayData.availabilityTime.start} - {displayData.availabilityTime.end}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(day => (
                      <span key={day} className={`text-[9px] font-black uppercase px-2 py-1 rounded-md transition-colors ${displayData.availableDays.includes(day) ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-300'}`}>
                        {day}
                      </span>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => setBooking(true)}
                  className="w-full mt-8 bg-blue-600 text-white py-5 rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-[#0f172a] transition-all flex items-center justify-center gap-2 shadow-xl shadow-blue-500/10 active:scale-95"
                >
                  Request Appointment <Check size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: REVIEWS & DEPTS */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 min-h-[500px]">
              <div className="flex bg-slate-50 border-b border-slate-100 px-2 py-2">
                <button
                  onClick={() => setActiveTab('reviews')}
                  className={`flex-1 py-4 flex items-center justify-center gap-3 font-black uppercase text-[10px] tracking-widest transition-all rounded-2xl
                  ${activeTab === 'reviews' ? 'bg-white text-[#0f172a] shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                >
                  <MessageSquare size={16} /> Patient Reviews
                </button>
                {isHospital && (
                  <button
                    onClick={() => setActiveTab('department')}
                    className={`flex-1 py-4 flex items-center justify-center gap-3 font-black uppercase text-[10px] tracking-widest transition-all rounded-2xl
                    ${activeTab === 'department' ? 'bg-white text-[#0f172a] shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                  >
                    <LayoutDashboard size={16} /> Facilities
                  </button>
                )}
              </div>

              <div className="p-6">
                {activeTab === 'reviews' ? (
                  <Reviews targetId={id} />
                ) : (
                  <Departments selectedDepts={profileData.departments || []} />
                )}
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* MODAL */}
      {booking && (
        <AppointmentBooking
          onClose={() => setBooking(false)}
          specialistType={specialistType}
          specialistId={id}
          specialistData={displayData} // Pass displayData for a better booking UI
        />
      )}
    </div>
  );
}

export default ProfileId;