import React, { useState } from 'react';
import { MapPin, Award, Star, ShieldCheck, Share2, Check, LayoutDashboard, MessageSquare } from 'lucide-react';
import Reviews from '../componentPages/Reviews';
import AppointmentBooking from '../components/AppointmentBooking';
import Departments from '../componentPages/Department'; // Import your department component

function ProfileId() {
  // 1. CONSTANT TO SWITCH TYPE (Change to 'hospital' to see the difference)
  const specialistType = 'hospital'; // Options: 'doctor' or 'hospital'

  // 2. STATE FOR HOSPITAL VIEW (Toggle between Reviews and Departments)
  const [activeTab, setActiveTab] = useState('reviews');

  const [booking, setBooking] = useState(false);

  const handleBooking = () => {
    setBooking(true);
  };

  const data = {
    name: specialistType === 'doctor' ? "Dr. Maria Elena" : "City General Hospital",
    specialty: specialistType === 'doctor' ? "Psychologist" : "Multi-Specialty Care",
    rating: 4.9,
    experience: specialistType === 'doctor' ? "12 years" : "Established 1995",
    image: specialistType === 'doctor'
      ? "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400"
      : "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=500",
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

          {/* Profile Header */}
          <div className="bg-white h-fit lg:sticky top-20 border border-gray-200 rounded-xl overflow-hidden transition-all">
            <div className="flex flex-col sm:flex-row">
              {/* Image Container: Flexible width on desktop, full width on mobile */}
              <div className="w-full sm:w-1/3 md:w-2/5 aspect-square sm:aspect-auto">
                <img
                  src={data.image}
                  alt={data.name}
                  className="w-full h-full object-cover hover:scale-110q transition-all duration-700"
                />
              </div>

              {/* Content Area: Fills remaining space */}
              <div className="flex-1 p-6 md:p-8 flex flex-col justify-center">
                <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest bg-blue-50 w-fit px-2 py-1 rounded">
                  {data.specialty}
                </span>

                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 uppercase tracking-tight mt-3 mb-4 leading-tight">
                  {data.name}
                </h1>

                <div className="flex flex-wrap items-center gap-4 md:gap-6 mb-4">
                  <div className="flex items-center gap-1.5 text-yellow-500">
                    <Star size={16} fill="currentColor" />
                    <span className="text-sm font-bold text-gray-900">{data.rating}</span>
                  </div>

                  <div className="flex items-center gap-1.5 text-gray-400">
                    {specialistType === 'doctor' ? <Award size={16} /> : <MapPin size={16} />}
                    <span className="text-sm font-medium">{data.experience}</span>
                  </div>
                </div>

                {/* Bio: Now inside the flex container so it flows correctly */}
                <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 hover:line-clamp-none transition-all cursor-default">
                  {data.bio}
                </p>
                <button
                  onClick={handleBooking}
                  className="w-fit rounded-lg mt-4 bg-gray-900 text-white p-4 text-sm font-bold hover:bg-blue-600 transition-all flex items-center justify-center gap-2 shadow-lg active:scale-[0.98]"
                >
                  Book Appointment <Check size={18} />
                </button>
              </div>
            </div>
          </div>


          {/* TAB SECTION: Show toggle only if it's a hospital */}
          <div className="bg-white border rounded-xl lg:col-span-2 border-gray-200">
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
      </div>

      {/* Appointment Booking Modal */}
      {booking && (
        <AppointmentBooking onClose={() => setBooking(false)} specialistType={specialistType} />
      )}
    </div>
  );
}

export default ProfileId;