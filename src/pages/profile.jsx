import React, { useState, useEffect } from 'react';
import { LayoutDashboard, X, Loader2 } from 'lucide-react';
import ProfileHeader from '../components/profileHeader';
import ProfileSidebar from '../components/profileSidebar';

// PAGE SECTIONS
import EditProfile from '../componentPages/EditProfile';
import AppointmentsList from '../Data/AppointmentList';

const Profile = ({ userData }) => {
  const [activeSection, setActiveSection] = useState(null);

  useEffect(() => {
    // Stripped down: default to appointments for both, or edit for others
    if (userData?.role && !activeSection && window.innerWidth >= 1024) {
      const role = userData.role.toLowerCase();
      setActiveSection(role === 'doctor' || role === 'patient' ? 'appointment' : 'edit');
    }
  }, [userData, activeSection]);

  const renderSection = () => {
    const sections = {
      edit: <EditProfile userData={userData} />,
      appointment: <AppointmentsList userRole={userData?.role || 'patient'} />,
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
              
              {/* SIDEBAR */}
              <aside className="lg:col-span-4">
                <div className="lg:sticky lg:top-24">
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

              {/* MAIN DESKTOP CONTENT */}
              <main className="hidden lg:flex lg:col-span-8 flex-col">
                {activeSection ? (
                  <div key={activeSection} className="animate-in fade-in slide-in-from-bottom-6 duration-700 flex-1">
                    
                    {renderSection()}
                  </div>
                ) : (
                  <div className="flex-1 flex flex-col items-center justify-center opacity-10">
                    <LayoutDashboard size={80} className="text-blue-600" />
                    <p className="mt-4 font-black text-[10px] uppercase tracking-[0.5em]">System Active</p>
                  </div>
                )}
              </main>
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE MODAL */}
      {activeSection && (
        <div className="fixed lg:hidden inset-0 flex items-end z-50 justify-center">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setActiveSection(null)} />
          <div className="relative w-full h-full max-h-[92vh] bg-white rounded-t-[3rem] overflow-hidden flex flex-col animate-in slide-in-from-bottom-10">
            <div className="flex items-center justify-between p-8 border-b border-slate-50">
              <span className="font-black text-[10px] uppercase tracking-[0.3em] text-blue-600">{activeSection}</span>
              <button onClick={() => setActiveSection(null)} className="p-3 bg-slate-100 text-slate-900 rounded-2xl hover:bg-red-50 hover:text-red-600 transition-colors">
                <X size={20} />
              </button>
            </div>
            <div className="overflow-y-auto flex-1 no-scrollbar p-6">{renderSection()}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;