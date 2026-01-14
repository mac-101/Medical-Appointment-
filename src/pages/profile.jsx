// const menuItems = [
//   { id: 'edit', icon: <Edit3 size={20} />, label: "Edit Profile", component: <EditProfile /> },
//   { id: 'appointment', icon: <Calendar size={20} />, label: "Appointment", component: <AppointmentsList /> },
//   { id: 'patient', icon: <Users size={20} />, label: "Patient", component: <PatientRecords /> },
//   { id: 'records', icon: <Receipt size={20} />, label: "Medical Record", component: <MedicalRecords /> },
//   { id: 'department', icon: <LayoutDashboard size={20} />, label: "Department", component: <Departments /> },
// ];

import React, { useState } from 'react';
import { ChevronRight, Calendar, Users, LayoutDashboard, Edit3, ArrowLeft, Receipt, Star } from 'lucide-react';

// IMPORT YOUR COMPONENTS
import EditProfile from '../componentPages/EditProfile';
import AppointmentsList from '../componentPages/Appointment';
import PatientRecords from '../componentPages/PatientsRecords';
import Departments from '../componentPages/Department';
import MedicalRecords from '../componentPages/MedicalRecord';
import Reviews from '../componentPages/Reviews'; // Assuming you have/will have this

const Profile = () => {
  // 1. DEFINE THE USER ROLE
  // Options: 'patient', 'doctor', 'hospital'
  const userRole = 'patient'; 

  // 2. SET INITIAL STATE BASED ON ROLE
  // Patient -> records | Doctor -> reviews | Hospital -> department
  const [activeSection, setActiveSection] = useState(() => {
    if (userRole === 'patient') return 'records';
    if (userRole === 'doctor') return 'reviews';
    if (userRole === 'hospital') return 'department';
    return null;
  });

  // 3. DEFINE ALL POSSIBLE ITEMS
  const allItems = [
    { id: 'edit', icon: <Edit3 size={20} />, label: "Edit Profile", component: <EditProfile /> },
    { id: 'appointment', icon: <Calendar size={20} />, label: "Appointment", component: <AppointmentsList /> },
    { id: 'patient', icon: <Users size={20} />, label: "Patient", component: <PatientRecords /> },
    { id: 'records', icon: <Receipt size={20} />, label: "Medical Record", component: <MedicalRecords /> },
    { id: 'department', icon: <LayoutDashboard size={20} />, label: "Department", component: <Departments /> },
    { id: 'reviews', icon: <Star size={20} />, label: "Reviews", component: <Reviews /> },
  ];

  // 4. FILTER ITEMS BASED ON YOUR RULES
  const menuItems = allItems.filter(item => {
    if (userRole === 'patient') {
      return ['edit', 'records'].includes(item.id);
    }
    if (userRole === 'doctor') {
      return ['edit', 'patient', 'reviews', 'records'].includes(item.id);
    }
    if (userRole === 'hospital') {
      return true; // Show everything for hospital
    }
    return false;
  });

  const renderActiveComponent = () => {
    const active = allItems.find(item => item.id === activeSection);
    return active ? active.component : null;
  };

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8">
      
      {/* 5. TOP ACTION BAR (Optional: Show Edit button here if viewing another section) */}
      <div className="flex justify-between items-center mb-8">
         <div className="flex flex-col md:flex-row md:items-center gap-4">
            <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150"
                className="w-20 h-20 rounded-full border-2 border-blue-600 object-cover"
                alt="Profile"
            />
            <div>
                <h1 className="text-2xl font-bold">Olivia Cartlee</h1>
                <p className="text-gray-500 uppercase text-xs font-bold tracking-widest">{userRole} Profile</p>
            </div>
         </div>
         
         {/* Edit Button at the top as requested */}
         {activeSection !== 'edit' && (
             <button 
                onClick={() => setActiveSection('edit')}
                className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-xl text-sm font-bold transition-all"
             >
                <Edit3 size={16} /> Edit
             </button>
         )}
      </div>

      <div >
        {activeSection ? (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
            {/* Show Back button only if there are other menus to see (Doctor/Hospital) */}
            {userRole !== 'patient' && (
                <button onClick={() => setActiveSection(null)} className="flex items-center gap-2 text-blue-600 mb-6 font-semibold">
                  <ArrowLeft size={18} /> View Menu
                </button>
            )}
            
            <div className="border-t border-gray-100 pt-6">
                {renderActiveComponent()}
            </div>
          </div>
        ) : (
          /* GRID MENU FOR MULTI-ROLE USERS */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className="flex items-center justify-between p-5 rounded-2xl bg-white shadow-sm hover:bg-blue-50 group transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className="md:p-3 text-blue-600">{item.icon}</div>
                  <span className="font-semibold text-gray-700">{item.label}</span>
                </div>
                <ChevronRight size={20} className="text-gray-400 group-hover:translate-x-1 transition-transform" />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;