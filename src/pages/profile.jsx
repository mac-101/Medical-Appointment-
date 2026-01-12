import React, { useState } from 'react';
import { 
  User, 
  ChevronRight, 
  Calendar, 
  Users, 
  LayoutDashboard, 
  Edit3, 
  ArrowLeft,
  LogOut
} from 'lucide-react';

const Profile = () => {
  const [activeSection, setActiveSection] = useState(null);

  const menuItems = [
    { id: 'edit', icon: <Edit3 size={20} />, label: "Edit Profile" },
    { id: 'appointment', icon: <Calendar size={20} />, label: "Appointment" },
    { id: 'patient', icon: <Users size={20} />, label: "Patient" },
    { id: 'department', icon: <LayoutDashboard size={20} />, label: "Department" },
  ];

  const SectionContent = ({ id, onBack }) => {
    const content = {
      edit: { title: "Edit Profile", desc: "Update your personal information and photo." },
      appointment: { title: "Medical Record", desc: "View and manage your upcoming medical visits." },
      patient: { title: "Patient Records", desc: "Access your medical records and diagnosis" },
      department: { title: "Departments", desc: "Explore hospital departments and specialists." },
    };

    return (
      <div className="animate-in fade-in slide-in-from-right-4 duration-300 w-full">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-blue-600 mb-6 font-semibold hover:text-blue-700"
        >
          <ArrowLeft size={18} /> Back to Menu
        </button>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">{content[id].title}</h2>
        <div className="p-8 bg-blue-50 rounded-2xl border border-blue-100">
          <p className="text-gray-600 leading-relaxed mb-6">
            {content[id].desc}
          </p>
          <div className="h-48 border-2 border-dashed border-blue-200 rounded-xl flex items-center justify-center text-blue-300 italic bg-white/50">
             {content[id].title} Content Goes Here
          </div>
        </div>
      </div>
    );
  };

  return (
      <div className="max-w-5xl mx-auto">
        
        {/* Desktop Header / Mobile Header Combined */}
        <div className="flex flex-col md:flex-row items-center md:items-end gap-6 mb-12">
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150" 
              alt="Profile" 
              className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-white shadow-md object-cover"
            />
          </div>
          <div className="text-center md:text-left">
            <h1 className="text-3xl font-bold text-gray-800">Olivia Cartlee</h1>
            <p className="text-gray-500 font-medium">Patient ID: #RAD5-001</p>
          </div>
        </div>

        <div className="bg-white overflow-hidden">
          <div className="p-2 md:p-8">
            {activeSection ? (
              <SectionContent id={activeSection} onBack={() => setActiveSection(null)} />
            ) : (
              /* Main Menu List - Responsive Grid on Desktop */
              <div className="animate-in fade-in slide-in-from-left-4 duration-300">
                <h3 className="text-gray-400 uppercase text-xs font-bold tracking-widest mb-6 px-4">Account Settings</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {menuItems.map((item) => (
                    <button 
                      key={item.id}
                      onClick={() => setActiveSection(item.id)}
                      className="w-full flex items-center justify-between p-2 md:p-3 lg:p-5 rounded-lg bg-gray-50 hover:bg-blue-50 transition-all group"
                    >
                      <div className="flex items-center gap-4">
                        <div className="p-3 rounded-xl bg-white text-blue-600 shadow-sm group-hover:text-blue-700 transition-colors">
                          {item.icon}
                        </div>
                        <span className="font-semibold text-gray-700">
                          {item.label}
                        </span>
                      </div>
                      <ChevronRight size={20} className="text-gray-400 group-hover:translate-x-1 transition-transform" />
                    </button>
                  ))}
                  
                  <button className="w-full flex items-center gap-4 p-5 rounded-lg text-red-500 hover:bg-red-50 transition-colors bg-gray-50 md:col-span-2">
                    <div className="p-3 rounded-xl bg-white shadow-sm">
                      <LogOut size={20} />
                    </div>
                    <span className="font-semibold">Logout</span>
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
  );
};

export default Profile;