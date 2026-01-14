import React, { useState } from 'react';
import { ChevronRight, Calendar, Users, LayoutDashboard, Edit3, ArrowLeft, Receipt, Star } from 'lucide-react';

// IMPORT YOUR COMPONENTS
import EditProfile from '../componentPages/EditProfile';
import AppointmentsList from '../componentPages/Appointment';
import PatientRecords from '../componentPages/PatientsRecords';
import Departments from '../componentPages/Department';
import MedicalRecords from '../componentPages/MedicalRecord';
import Reviews from '../componentPages/Reviews';

const Profile = () => {
  const [userRole, setUserRole] = useState('patient'); // Options: 'patient', 'doctor', 'hospital'
  const switchUser = () => {
    if (userRole === 'patient') {
      setUserRole('doctor');
    } else if (userRole === 'doctor') {
      setUserRole('hospital');
    } else {
      setUserRole('patient');
    }
  };

  const [activeSection, setActiveSection] = useState(() => {
    if (userRole === 'patient') return 'records';
    if (userRole === 'doctor') return 'reviews';
    if (userRole === 'hospital') return 'department';
    return 'edit';
  });

  const allItems = [
    { id: 'edit', icon: <Edit3 size={20} />, label: "Edit Profile", component: <EditProfile /> },
    { id: 'appointment', icon: <Calendar size={20} />, label: "Appointment", component: <AppointmentsList /> },
    { id: 'patient', icon: <Users size={20} />, label: "Patient", component: <PatientRecords /> },
    { id: 'records', icon: <Receipt size={20} />, label: "Medical Record", component: <MedicalRecords /> },
    { id: 'department', icon: <LayoutDashboard size={20} />, label: "Department", component: <Departments /> },
    { id: 'reviews', icon: <Star size={20} />, label: "Reviews", component: <Reviews /> },
  ];

  const menuItems = allItems.filter(item => {
    if (userRole === 'patient') return ['records'].includes(item.id);
    if (userRole === 'doctor') return ['patient', 'reviews', 'records'].includes(item.id);
    if (userRole === 'hospital') return true;
    return false;
  });

  const renderActiveComponent = () => {
    const active = allItems.find(item => item.id === activeSection);
    return active ? active.component : <div className="p-8 text-center text-gray-400">Select a section</div>;
  };

  const addDepartment = () => {
    setActiveSection('department');
  };

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-10 min-h-screen">

      {/* 1. PROFILE HEADER CARD - Scaled for all sizes */}
      <div className="bg-white rounded-xl p-6 md:p-8 border-b-2 border-gray-100 mb-8 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150"
              className="w-24 h-24 md:w-30 md:h-30 rounded-full border-4 border-blue-50 object-cover shadow-inner"
              alt="Profile"
            />
            <div className="absolute bottom-1 right-1 w-6 h-6 bg-green-500 border-4 border-white rounded-full"></div>
          </div>
          <div>
            <h1 className="text-3xl font-black text-gray-900 tracking-tight">Olivia Cartlee</h1>
            <div className="flex items-center gap-2 mt-1 justify-center md:justify-start">
              <span className="px-3 py-1 bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-md shadow-blue-100">
                {userRole}
              </span>
              <span className="text-gray-400 text-xs font-bold uppercase tracking-tighter">Verified Member</span>
            </div>
          </div>
        </div>

        {activeSection !== 'edit' && (
          <button
            onClick={() => {
              if (userRole === 'hospital') {
                addDepartment();
              } else {
                setActiveSection('edit');
              }
            }}
            className="w-full md:w-auto flex items-center justify-center gap-2 bg-gray-900 text-white hover:bg-blue-600 px-8 py-4 rounded-2xl text-xs font-black uppercase tracking-widest transition-all active:scale-95 shadow-lg shadow-gray-200"
          >
            <Edit3 size={16} />
            <span>
              {userRole === 'hospital' ? "Add Departments" : "Edit Profile"}
            </span>
          </button>
        )}
        <button
          onClick={switchUser} value="switch between user types" className='px-4 py-2 bg-gray-100 text-gray-600 rounded-xl hover:bg-gray-200 transition-all text-xs font-bold'>
          text users switch
        </button>
      </div>

      {/* 2. MAIN INTERFACE - Split Layout for Desktop, Grid/Stack for Mobile */}
      <div className="flex flex-col lg:flex-row gap-8 items-start">

        {/* LEFT SIDE: NAVIGATION MENU */}
        <div className={`w-full lg:w-80 space-y-3 sticky top-24 ${activeSection && 'hidden lg:block'}`}>
          <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-4 mb-4">Management</h3>
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`w-full flex items-center justify-between p-4 rounded-xl transition-all group
                  ${activeSection === item.id
                  ? 'bg-blue-600 text-white shadow-xl shadow-blue-100 scale-[1.02]'
                  : 'bg-white text-gray-600 hover:shadow-lg shadow-sm'}`}
            >
              <div className="flex items-center gap-4">
                <div className={`${activeSection === item.id ? 'text-white' : 'text-blue-600'}`}>
                  {item.icon}
                </div>
                <span className="font-bold text-sm">{item.label}</span>
              </div>
              <ChevronRight size={18} className={`${activeSection === item.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} transition-all`} />
            </button>
          ))}
        </div>

        {/* RIGHT SIDE: CONTENT DISPLAY */}
        <div className={`flex-1 w-full bg-white rounded-xl border-t-2 border-gray-100 min-h-125 overflow-hidden ${!activeSection && 'hidden lg:block'}`}>
          {activeSection && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-500 h-full flex flex-col">
              {/* Header for the content box (Mobile Back Button) */}
              <div className="p-6 border-b border-gray-50 flex items-center justify-between lg:justify-end">
                <button
                  onClick={() => setActiveSection(null)}
                  className="lg:hidden flex items-center gap-2 text-blue-600 font-black text-[10px] uppercase tracking-widest bg-blue-50 px-4 py-2 rounded-xl"
                >
                  <ArrowLeft size={16} /> Back to Menu
                </button>
                <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest">
                  {activeSection} View
                </span>
              </div>

              <div className="p-6 md:p-10 flex-1">
                {renderActiveComponent()}
              </div>
            </div>
          )}

          {!activeSection && (
            <div className="hidden lg:flex h-full items-center justify-center p-20 text-center">
              <div className="space-y-4">
                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto">
                  <LayoutDashboard size={32} className="text-gray-200" />
                </div>
                <p className="text-gray-400 font-bold uppercase text-[10px] tracking-[0.2em]">Select a section to manage</p>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Profile;