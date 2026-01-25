import React from 'react';

const ProfileHeader = ({ userData }) => {
  if (!userData) return null;

  return (
    <div className="px-6 zoomIN md:px-15 pt-12 pb-24 flex flex-col md:flex-row gap-2 md:items-center max-w-7xl mx-auto bg-linear-to-br from-blue-700 via-blue-600 to-blue-500">


      <div className="relative">
        <img
          src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150"
          alt="Profile"
          className="w-15 h-15 md:w-32 md:h-32 rounded-full border-4 border-white/30 shadow-lg object-cover"
        />
      </div>
      <div>
        <h1 className="text-xl md:text-2xl font-medium text-blue-100">Hi,</h1>
        <h1 className="text-2xl md:text-3xl font-bold text-white">          {userData.role === "doctor" && "Dr. "} {userData.name} {userData.role === "hospital" && "Hospital"}
        </h1>
        <p className="text-blue-50/80 font-medium">How's your health today?</p>
      </div>


    </div>
  );
};

export default ProfileHeader;