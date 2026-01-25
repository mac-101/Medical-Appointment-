import React, { useState, useEffect } from 'react';
import { LayoutDashboard, X } from 'lucide-react';
import ProfileHeader from '../components/profileHeader';
import ProfileSidebar from '../components/profileSidebar';

// SECTION COMPONENTS
import EditProfile from '../componentPages/EditProfile';
import AppointmentsList from '../Data/AppointmentList';
import PatientRecords from '../componentPages/PatientsRecords';
import Departments from '../Data/Department';
import MedicalRecords from '../Data/MedicalRecord';
import Reviews from '../componentPages/Reviews';

const Profile = ({ userData }) => {
  const [activeSection, setActiveSection] = useState(null);

  useEffect(() => {
    const isDesktop = window.innerWidth >= 1024;
    if (userData && !activeSection && isDesktop) {
      const defaults = { 
        patient: 'records', 
        doctor: 'reviews', 
        hospital: 'department' 
      };
      setActiveSection(defaults[userData.role]);
    }
  }, [userData, activeSection]);

  const renderSection = () => {
    if (!userData || !activeSection) return null;
    const sections = {
      edit: <EditProfile userData={userData} />,
      appointment: <AppointmentsList />,
      patient: <PatientRecords />,
      records: <MedicalRecords />,
      department: <Departments />,
      reviews: <Reviews />,
    };
    return sections[activeSection] || null;
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans text-[#0f172a]">
      {/* 1. THE DEEP BLUE BACKGROUND */}

      <div className="max-w-7xl mx-auto relative z-10 ">
        {/* Header stays above the "sheet" */}
        <ProfileHeader userData={userData} />

        {/* 2. THE REVEAL SHEET (Negative Margin moves this up) */}
        <div className="relative bg-white rounded-t-[3.5rem] -mt-16 min-h-screen shadow-[0_-20px_50px_-20px_rgba(0,0,0,0.2)]">
          <div className="p-8 lg:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              
              {/* 3. STICKY SIDEBAR */}
              <aside className="lg:col-span-4">
                <div className="lg:sticky lg:top-24 self-start">
                  <ProfileSidebar
                    userRole={userData?.role}
                    activeSection={activeSection}
                    setActiveSection={setActiveSection}
                  />
                </div>
              </aside>

              {/* 4. MAIN DESKTOP CONTENT */}
              <main className="hidden lg:flex lg:col-span-8 flex-col min-h-[600px]">
                {activeSection ? (
                  <div key={activeSection} className="animate-in fade-in slide-in-from-bottom-6 duration-700 flex-1">
                    {renderSection()}
                  </div>
                ) : (
                  <div className="flex-1 flex flex-col items-center justify-center opacity-10">
                    <LayoutDashboard size={80} className="text-blue-600" />
                    <p className="mt-4 font-black text-[10px] uppercase tracking-[0.5em]">System_Standby</p>
                  </div>
                )}
              </main>

            </div>
          </div>
        </div>
      </div>

      {/* 5. MOBILE MODAL (Stays outside the sheet logic for better z-index) */}
      {activeSection && (
        <div className="fixed lg:hidden inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-blue-900/40 backdrop-blur-md animate-in fade-in duration-300"
            onClick={() => setActiveSection(null)}
          />
          <div className="relative w-full max-h-[90vh] bg-white rounded-[3rem] shadow-2xl overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-10 duration-500 flex flex-col">
            <div className="flex items-center justify-between p-6 border-b border-blue-50 bg-white sticky top-0">
              <span className="font-black text-[10px] uppercase tracking-[0.3em] text-blue-600">{activeSection}_CORE</span>
              <button
                onClick={() => setActiveSection(null)}
                className="p-3 rounded-2xl bg-blue-50 text-blue-600 active:scale-90 transition-all"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-8 overflow-y-auto flex-1 bg-white">
              {renderSection()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;