import React, { useState } from 'react';
import { ChevronRight, Calendar, Users, LayoutDashboard, Edit3, ArrowLeft, Receipt, Star } from 'lucide-react';

// IMPORT YOUR COMPONENTS
import EditProfile from '../componentPages/EditProfile';
import AppointmentsList from '../Data/AppointmentList';
import PatientRecords from '../componentPages/PatientsRecords';
import Departments from '../Data/Department';
import MedicalRecords from '../Data/MedicalRecord';
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

  const getRoleSummary = () => {
    switch (userRole) {
      case 'hospital':
        return [
          { label: 'Capacity', value: '500+', unit: 'beds' },
          { label: 'Staff', value: '120', unit: 'MDs' },
          { label: 'Rating', value: '4.9', unit: '⭐' }
        ];
      case 'doctor':
        return [
          { label: 'Patients', value: '1.2k', unit: '' },
          { label: 'Experience', value: '12', unit: 'yrs' },
          { label: 'Reviews', value: '450', unit: '' }
        ];
      default: // patient
        return [
          { label: 'Height', value: "5'8\"", unit: '' },
          { label: 'Weight', value: '150', unit: 'lb' },
          { label: 'Blood', value: 'O+', unit: '' }
        ];
    }
  };

  const summaryData = getRoleSummary();


  const [activeSection, setActiveSection] = useState(() => {
    if (userRole === 'patient') return 'records';
    if (userRole === 'doctor') return 'reviews';
    if (userRole === 'hospital') return 'department';
    return 'edit';
  });

  const allItems = [
    { id: 'edit', icon: <Edit3 size={20} />, label: "Edit Profile", component: <EditProfile userRole={userRole} /> },
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

  // const addDepartment = () => {
  //   setActiveSection('department');
  // };

  return (
    <div className="max-w-7xl mx-auto px-2 pb-20 min-h-screen">

      {/* 1. PROFILE HEADER CARD - Scaled for all sizes */}
      <div className="px-4 py-8 md:px-0 mb-12 flex flex-col md:flex-row justify-between items-center gap-10">

        {/* LEFT: AVATAR & IDENTITY */}
        <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150"
              className="w-24 h-24 md:w-28 md:h-28 rounded-full object-cover grayscale-20"
              alt="Profile"
            />
            <div className="absolute bottom-2 right-2 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
          </div>

          <div className="space-y-1">
            <h1 className="text-3xl font-black text-gray-900 tracking-tighter uppercase leading-none">
              {userRole === 'hospital' ? "City Central Hospital" : "Olivia Cartlee"}
            </h1>
            <div className="flex items-center gap-3 justify-center md:justify-start mt-2">
              <span className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em]">
                {userRole}
              </span>
              <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
              <span className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">
                ID: #00234
              </span>
            </div>
          </div>
        </div>

        {/* MIDDLE: DYNAMIC SUMMARY (Plane Spacing) */}
        <div className="flex items-center gap-8 md:gap-14">
          {summaryData.map((stat, index) => (
            <div key={index} className="text-center group">
              <p className="text-[10px] font-bold text-gray-300 uppercase tracking-widest mb-2 transition-colors group-hover:text-blue-400">
                {stat.label}
              </p>
              <span className="text-xl font-black text-gray-900 tracking-tighter">
                {stat.value}
                {stat.unit && <span className="text-[10px] ml-0.5 text-gray-400 uppercase">{stat.unit}</span>}
              </span>
            </div>
          ))}
        </div>

        {/* RIGHT: FLAT ACTIONS */}
        <div className="flex flex-row md:flex-col gap-4 items-center md:items-end">
          {activeSection !== 'edit' && (
            <button
              onClick={() => setActiveSection(userRole === 'hospital' ? 'department' : 'edit')}
              className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-900 border-b-2 border-gray-900 pb-1 hover:text-blue-600 hover:border-blue-600 transition-all"
            >
              {userRole === 'hospital' ? "Add Depts" : "Edit Profile"}
            </button>
          )}

          <button
            onClick={switchUser}
            className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 hover:text-gray-900 transition-all"
          >
            Switch Role
          </button>
        </div>
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
                  <ArrowLeft size={16} />Menu
                </button>
                <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest">
                  {activeSection} View
                </span>
              </div>

              <div className="p-1 md:p-10 flex-1">
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


