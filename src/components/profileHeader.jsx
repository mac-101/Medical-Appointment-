import React from 'react';
import { ShieldCheck, MapPin } from 'lucide-react';

const ProfileHeader = ({ userData }) => {
  if (!userData) return null;

  const isDoctor = userData.role?.toLowerCase() === 'doctor';

  return (
    <div className="relative px-8 md:px-12 pt-16 pb-28 flex flex-col md:flex-row gap-8 items-center md:items-end max-w-7xl mx-auto  rounded-b-[3rem] shadow-2xl overflow-hidden">
      
      {/* Background Accent */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-[100px] -mr-32 -mt-32"></div>

      {/* Profile Image with Verification Badge */}
      {userData.role != 'patient' && (
        <div className="relative shrink-0">
        <img
          src={userData.image?.url || "https://api.dicebear.com/9.x/avataaars/svg?"}
          alt="Profile"
          className="w-32 h-32 md:w-40 md:h-40 rounded-[2.5rem]  shadow-2xl object-cover "
        />
        <div className="absolute -bottom-2 -right-2 bg-blue-600 text-white p-2 rounded-xl ">
          <ShieldCheck size={20} />
        </div>
      </div>
      )}

      {/* User Info */}
      <div className="flex-1 text-center md:text-left pb-4">
        <div className="flex flex-col md:flex-row md:items-center gap-2 mb-2">
          <span className="inline-block px-3 py-1 bg-blue-500/10 text-blue-400 text-[12px] roboto-font rounded-lg border border-blue-500/20 w-fit mx-auto md:mx-0">
            {userData.role} Account
          </span>
          {userData.location && (
            <div className="flex items-center gap-1 justify-center md:justify-start text-slate-500 text-[10px] font-bold uppercase tracking-widest">
              <MapPin size={12} /> {userData.location}
            </div>
          )}
        </div>

        <h1 className="text-3xl md:text-5xl text-slate-900 tracking-tighter font">
          {isDoctor && "Dr. "}{userData.name || userData.fullName}
        </h1>
        
        <p className="mt-4 text-slate-400 font-medium text-lg italic">
          {isDoctor ? `Specialized in ${userData.specialty}` : "Welcome back to your health portal."}
        </p>
      </div>
    </div>
  );
};

export default ProfileHeader;