import React from 'react';
import { Edit3, Calendar, Users, Receipt, LayoutDashboard, Star } from 'lucide-react';

const ProfileSidebar = ({ userRole, activeSection, setActiveSection }) => {
  const menuItems = [
    { id: 'edit', icon: <Edit3 size={20} />, label: "Settings", roles: ['patient', 'doctor', 'hospital'] },
    { id: 'appointment', icon: <Calendar size={20} />, label: "Schedule", roles: ['patient', 'doctor', 'hospital'] },
    // { id: 'patient', icon: <Users size={20} />, label: "Patients", roles: ['doctor', 'hospital'] },
    // { id: 'records', icon: <Receipt size={20} />, label: "Records", roles: ['patient', 'doctor', 'hospital'] },
    { id: 'department', icon: <LayoutDashboard size={20} />, label: "Departments", roles: ['hospital'] },
    { id: 'reviews', icon: <Star size={20} />, label: "Feedback", roles: ['doctor', 'hospital'] },
  ].filter(item => item.roles.includes(userRole?.toLowerCase()));

  return (
    <nav className="flex flex-col gap-3">
      {menuItems.map((item) => (
        <button
          key={item.id}
          onClick={() => setActiveSection(item.id)}
          className={`w-full flex items-center gap-4 p-5 rounded-2xl transition-all duration-200
            ${activeSection === item.id 
              ? 'bg-blue-600 text-white shadow-lg shadow-blue-200 scale-[1.02]' 
              : 'bg-white text-blue-400 hover:bg-blue-50 border border-blue-50'}`}
        >
          <div className={activeSection === item.id ? 'text-white' : 'text-blue-500'}>
            {item.icon}
          </div>
          <span className="font-black text-xs uppercase tracking-widest leading-none">
            {item.label}
          </span>
        </button>
      ))}
    </nav>
  );
};

export default ProfileSidebar;