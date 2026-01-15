import React, { useState } from 'react';

const EditProfile = ({ userRole }) => {
  // 1. STATE MANAGEMENT FOR FORM DATA
  const [formData, setFormData] = useState({
    fullName: "Olivia Cartlee",
    email: "olivia@healthcore.com",
    // Patient specific
    height: "5'8\"",
    weight: "150",
    // Doctor/Hospital specific
    specialty: "Cardiology",
    experience: "12",
    capacity: "500"
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* SECTION HEADER */}
      <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-8">
        <div>
          <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">
            Account Management
          </h3>
          <h2 className="text-xl font-black text-gray-900 tracking-tighter uppercase mt-1">
            Update {userRole} Details
          </h2>
        </div>
        <button className="text-[10px] font-black uppercase tracking-widest bg-gray-900 text-white px-6 py-3 rounded-full hover:bg-blue-600 transition-all active:scale-95">
          Save Changes
        </button>
      </div>

      {/* FORM GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
        
        {/* Basic Info (All Roles) */}
        <div className="space-y-6">
          <div className="group">
            <label className="text-[10px] font-bold text-gray-300 uppercase tracking-widest block mb-2 group-focus-within:text-blue-500 transition-colors">
              {userRole === 'hospital' ? 'Hospital Name' : 'Full Name'}
            </label>
            <input 
              name="fullName"
              type="text" 
              value={formData.fullName}
              onChange={handleChange}
              className="w-full pb-2 bg-transparent border-b-2 border-gray-100 outline-none font-black text-gray-900 tracking-tight focus:border-gray-900 transition-all placeholder:text-gray-200" 
            />
          </div>

          <div className="group">
            <label className="text-[10px] font-bold text-gray-300 uppercase tracking-widest block mb-2 group-focus-within:text-blue-500 transition-colors">
              Email Address
            </label>
            <input 
              name="email"
              type="email" 
              value={formData.email}
              onChange={handleChange}
              className="w-full pb-2 bg-transparent border-b-2 border-gray-100 outline-none font-black text-gray-900 tracking-tight focus:border-gray-900 transition-all" 
            />
          </div>
        </div>

        {/* ROLE SPECIFIC FIELDS (The Dynamic Part) */}
        <div className="space-y-6">
          {userRole === 'patient' && (
            <div className="grid grid-cols-2 gap-8">
              <div className="group">
                <label className="text-[10px] font-bold text-gray-300 uppercase tracking-widest block mb-2 group-focus-within:text-blue-500 transition-colors">Height</label>
                <input name="height" value={formData.height} onChange={handleChange} className="w-full pb-2 bg-transparent border-b-2 border-gray-100 outline-none font-black text-gray-900 tracking-tight focus:border-gray-900" />
              </div>
              <div className="group">
                <label className="text-[10px] font-bold text-gray-300 uppercase tracking-widest block mb-2 group-focus-within:text-blue-500 transition-colors">Weight (lbs)</label>
                <input name="weight" value={formData.weight} onChange={handleChange} className="w-full pb-2 bg-transparent border-b-2 border-gray-100 outline-none font-black text-gray-900 tracking-tight focus:border-gray-900" />
              </div>
            </div>
          )}

          {(userRole === 'doctor' || userRole === 'hospital') && (
            <div className="group">
              <label className="text-[10px] font-bold text-gray-300 uppercase tracking-widest block mb-2 group-focus-within:text-blue-500 transition-colors">
                Primary Specialty
              </label>
              <input 
                name="specialty"
                value={formData.specialty}
                onChange={handleChange}
                className="w-full pb-2 bg-transparent border-b-2 border-gray-100 outline-none font-black text-gray-900 tracking-tight focus:border-gray-900" 
              />
            </div>
          )}

          {userRole === 'hospital' && (
            <div className="group">
              <label className="text-[10px] font-bold text-gray-300 uppercase tracking-widest block mb-2 group-focus-within:text-blue-500 transition-colors">Bed Capacity</label>
              <input name="capacity" value={formData.capacity} onChange={handleChange} className="w-full pb-2 bg-transparent border-b-2 border-gray-100 outline-none font-black text-gray-900 tracking-tight focus:border-gray-900" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditProfile;