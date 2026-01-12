import React, { useState } from 'react';
import { User, ChevronRight, Calendar, Users, LayoutDashboard, Edit3, ArrowLeft, Receipt } from 'lucide-react';

// 1. IMPORT YOUR NEW COMPONENTS
import EditProfile from '../componentPages/EditProfile';
import AppointmentsList from '../componentPages/Appointment';
import PatientRecords from '../componentPages/PatientsRecords';
import Departments from '../componentPages/Department';
import MedicalRecords from '../componentPages/MedicalRecord';

const Profile = () => {
  const [activeSection, setActiveSection] = useState(null);

  const menuItems = [
    { id: 'edit', icon: <Edit3 size={20} />, label: "Edit Profile", component: <EditProfile /> },
    { id: 'appointment', icon: <Calendar size={20} />, label: "Appointment", component: <AppointmentsList /> },
    { id: 'patient', icon: <Users size={20} />, label: "Patient", component: <PatientRecords /> },
    { id: 'records', icon: <Receipt size={20} />, label: "Medical Record", component: <MedicalRecords /> },
    { id: 'department', icon: <LayoutDashboard size={20} />, label: "Department", component: <Departments /> },
  ];

  // Helper to find the active component
  const renderActiveComponent = () => {
    const active = menuItems.find(item => item.id === activeSection);
    return active ? active.component : null;
  };

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8">

      {/* Header section code remains the same... */}
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

      <div className="bg-white  overflow-hidden">
        <div className="">
          {activeSection ? (
            <div className="animate-in fade-in slide-in-from-right-4 duration-300">
              <button onClick={() => setActiveSection(null)} className="flex items-center gap-2 text-blue-600 mb-6 font-semibold">
                <ArrowLeft size={18} /> Back
              </button>
              {/* 2. RENDER THE COMPONENT DYNAMICALLY */}
              {renderActiveComponent()}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className="flex items-center justify-between p-2 md:p-3 lg:p-5 rounded-2xl bg-gray-10 shadow-sm hover:bg-blue-50 group transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-white text-blue-600 shadow-sm">{item.icon}</div>
                    <span className="font-semibold text-gray-700">{item.label}</span>
                  </div>
                  <ChevronRight size={20} className="text-gray-400 group-hover:translate-x-1 transition-transform" />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;