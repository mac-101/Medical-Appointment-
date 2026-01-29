import React, { useState, useEffect } from 'react';
import { LayoutDashboard, X, Loader2 } from 'lucide-react';
import ProfileHeader from '../components/profileHeader';
import ProfileSidebar from '../components/profileSidebar';


// PAGE SECTIONS
import EditProfile from '../componentPages/EditProfile';
import AppointmentsList from '../Data/AppointmentList';
// import PatientRecords from '../componentPages/PatientsRecords';
import Departments from '../Data/Department';
// import MedicalRecords from '../Data/MedicalRecord';
import Reviews from '../componentPages/Reviews';
// import { set } from 'firebase/database';

const Profile = ({ userData }) => { // Data comes from ProtectedRoute now!
  const [activeSection, setActiveSection] = useState(null);

  useEffect(() => {
  if (userData?.role && activeSection && window.innerWidth >= 1024) {
    const role = userData.role.toLowerCase(); // Standardize to lowercase
    const defaults = { 
      patient: 'appointment', 
      doctor: 'reviews', 
      hospital: 'department' 
    };
    
    // Set the default or fallback to 'edit'
    setActiveSection(defaults[role] || 'edit');
  }
}, [userData, activeSection]);


  const renderSection = () => {
    const sections = {
      edit: <EditProfile userData={userData} />,
      appointment: <AppointmentsList userRole={userData?.role || 'patient'} />,
      // patient: <PatientRecords userRole={userData?.role} />,
      // records: <MedicalRecords />,
      department: <Departments />,
      reviews: <Reviews />,
    };
    return sections[activeSection] || null;
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans text-[#0f172a]">

      <div className="max-w-7xl mx-auto relative z-10">
        <ProfileHeader userData={userData} />

        <div className="relative bg-white rounded-t-[3.5rem] -mt-16 min-h-screen shadow-2xl">
          <div className="p-8 lg:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

              <aside className="lg:col-span-4">
                <div className="lg:sticky lg:top-24">
                  {/* Add a check for userData.role here */}
                  {userData?.role ? (
                    <ProfileSidebar
                      userRole={userData.role}
                      activeSection={activeSection}
                      setActiveSection={setActiveSection}
                    />
                  ) : (
                    <div className="p-10 flex justify-center">
                      <Loader2 className="animate-spin text-blue-600" />
                    </div>
                  )}
                </div>
              </aside>

              <main className="hidden lg:flex lg:col-span-8 flex-col min-h-150">
                {activeSection ? (
                  <div key={activeSection} className="animate-in fade-in slide-in-from-bottom-6 duration-700 flex-1">
                    {renderSection()}
                  </div>
                ) : (
                  <div className="flex-1 flex flex-col items-center justify-center opacity-10">
                    <LayoutDashboard size={80} className="text-blue-600" />
                    <p className="mt-4 font-black text-[10px] uppercase tracking-[0.5em]">Standby</p>
                  </div>
                )}
              </main>

            </div>
          </div>
        </div>
      </div>

      {/* MOBILE MODAL */}
      {activeSection && (
        <div className="fixed lg:hidden inset-0 flex items-end z-60 justify-center ">
          <div className="absolute inset-0 bg-blue-900/40 backdrop-blur-md" onClick={() => setActiveSection(null)} />
          <div className="relative w-full scrollUP h-full max-h-[90vh] bg-white rounded-t-[3rem] overflow-hidden flex flex-col animate-in slide-in-from-bottom-10">
            <div className="flex items-center justify-between p-6 border-b border-blue-50">
              <span className="font-black text-[10px] uppercase tracking-[0.3em] text-blue-600">{activeSection}</span>
              <button onClick={() => setActiveSection(null)} className="p-3 bg-blue-50 text-blue-600 rounded-2xl"><X size={20} /></button>
            </div>
            <div className=" overflow-y-auto flex-1 no-scrollbar">{renderSection()}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;