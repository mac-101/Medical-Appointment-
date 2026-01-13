import React, { useState } from 'react';
import { MapPin, Award, Star, ShieldCheck, Share2, LayoutDashboard, MessageSquare } from 'lucide-react';
import Reviews from '../componentPages/Reviews';
import AppointmentBooking from '../components/AppointmentBooking';
import Departments from '../componentPages/Department'; // Import your department component

function ProfileId() {
  // 1. CONSTANT TO SWITCH TYPE (Change to 'hospital' to see the difference)
  const specialistType = 'doctor'; 
  
  // 2. STATE FOR HOSPITAL VIEW (Toggle between Reviews and Departments)
  const [activeTab, setActiveTab] = useState('reviews');

  const data = {
    name: specialistType === 'doctor' ? "Dr. Maria Elena" : "City General Hospital",
    specialty: specialistType === 'doctor' ? "Psychologist" : "Multi-Specialty Care",
    rating: 4.9,
    experience: specialistType === 'doctor' ? "12 years" : "Established 1995",
    image: specialistType === 'doctor' 
      ? "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400"
      :"https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=500",
    bio: specialistType === 'doctor'
      ? "Specializing in cognitive behavioral therapy and emotional wellness."
      : "Providing world-class healthcare facilities with over 50 specialized departments."
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="sticky top-0 z-10 bg-white border-b border-gray-100 p-4 flex justify-between items-center">
        <h2 className="font-black uppercase tracking-tighter text-lg">
          {specialistType === 'doctor' ? "Doctor Profile" : "Hospital Detail"}
        </h2>
        <div className="flex gap-4">
          <Share2 size={20} className="text-gray-400 cursor-pointer" />
          <ShieldCheck size={20} className="text-blue-600" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-2 space-y-8">
            {/* Profile Header */}
            <div className="bg-white border border-gray-200 overflow-hidden">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/3">
                  <img src={data.image} alt={data.name} className="w-full h-full object-cover transition-all duration-500" />
                </div>
                <div className="p-8 md:w-2/3">
                  <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">{data.specialty}</span>
                  <h1 className="text-4xl font-black text-gray-900 uppercase tracking-tighter mt-2 mb-4 leading-none">{data.name}</h1>
                  <div className="flex items-center gap-6 mb-6">
                    <div className="flex items-center gap-1 text-yellow-500">
                      <Star size={16} fill="currentColor" />
                      <span className="text-sm font-bold text-gray-900">{data.rating}</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-400">
                      {specialistType === 'doctor' ? <Award size={16} /> : <MapPin size={16} />}
                      <span className="text-sm font-bold">{data.experience}</span>
                    </div>
                  </div>
                  <p className="text-gray-600 leading-relaxed mb-6">{data.bio}</p>
                </div>
              </div>
            </div>

            {/* TAB SECTION: Show toggle only if it's a hospital */}
            <div className="bg-white border border-gray-200">
              <div className="flex border-b border-gray-100">
                {/* Always show Reviews Tab */}
                <button 
                  onClick={() => setActiveTab('reviews')}
                  className={`flex-1 py-4 flex items-center justify-center gap-2 font-black uppercase text-xs tracking-widest transition-all
                  ${activeTab === 'reviews' ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50/30' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  <MessageSquare size={16} /> Reviews
                </button>

                {/* Show Departments Tab ONLY if specialistType is hospital */}
                {specialistType === 'hospital' && (
                  <button 
                    onClick={() => setActiveTab('department')}
                    className={`flex-1 py-4 flex items-center justify-center gap-2 font-black uppercase text-xs tracking-widest transition-all
                    ${activeTab === 'department' ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50/30' : 'text-gray-400 hover:text-gray-600'}`}
                  >
                    <LayoutDashboard size={16} /> Departments
                  </button>
                )}
              </div>

              <div className="p-8">
                {activeTab === 'reviews' ? <Reviews /> : <Departments />}
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <AppointmentBooking />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default ProfileId;