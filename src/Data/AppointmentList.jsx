import React, { useState, useEffect } from 'react';
import { Search, Calendar, Clock, Inbox, Loader2 } from "lucide-react";
import { db, auth } from '../../firebase.config';
import { ref, onValue, update, query, orderByChild, equalTo, get } from 'firebase/database';
import AppointmentDetail from "../components/AppointmentDetailContent";
import toast from 'react-hot-toast';

export default function AppointmentsList({ userRole }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userId = auth.currentUser?.uid;
    if (!userId) return;

    const isDoctor = userRole?.toLowerCase() === 'doctor';
    const q = query(ref(db, 'bookings'), orderByChild(isDoctor ? 'specialistId' : 'patientId'), equalTo(userId));

    return onValue(q, async (snapshot) => {
      const data = snapshot.val();
      if (!data) { setAppointments([]); setLoading(false); return; }

      const list = await Promise.all(Object.entries(data).map(async ([id, value]) => {
        let displayTitle = value.specialistName || "Provider";
        if (isDoctor) {
          try {
            const userSnap = await get(ref(db, `users/${value.patientId}`));
            displayTitle = userSnap.exists() ? userSnap.val().name : "Patient";
          } catch { displayTitle = "Patient Request"; }
        }
        return { id, ...value, displayTitle };
      }));

      setAppointments(list.reverse());
      setLoading(false);
    });
  }, [userRole]);

  const updateStatus = async (id, status) => {
    try {
      await update(ref(db, `bookings/${id}`), { status });
      toast.success(`Marked as ${status}`);
      if (selectedAppointment?.id === id) setSelectedAppointment(prev => ({ ...prev, status }));
    } catch (e) { toast.error("Update failed"); }
  };

  const filtered = appointments.filter(a => 
    a.displayTitle?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.specialty?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div className="h-64 flex items-center justify-center"><Loader2 className="animate-spin text-blue-600" /></div>;

  return (
    <div className="w-full space-y-6">
      {/* SEARCH BAR - SYSTEM STYLE */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
        <input
          type="text"
          placeholder="Filter by name or specialty..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-slate-50 border border-slate-100 py-4 pl-12 pr-4 rounded-2xl outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all text-xs font-bold uppercase tracking-wider"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* LIST VIEW */}
        <div className="lg:col-span-7 space-y-3">
          {filtered.length > 0 ? filtered.map((apt) => (
            <button
              key={apt.id}
              onClick={() => setSelectedAppointment(apt)}
              className={`w-full p-5 rounded-[2rem] border border-slate-50 hover:border-blue-100 hover:shadow-[0_20px_50px_rgba(8,112,184,0.08)] transition-all duration-500 flex items-center justify-between text-left`}
            >
              <div className="flex gap-4 items-center">
                <div className={`p-3 rounded-2xl ${selectedAppointment?.id === apt.id ? 'bg-blue-500 text-white' : 'bg-slate-100 text-slate-500'}`}>
                   <Calendar size={20} />
                </div>
                <div>
                  <h3 className="font-black text-slate-900 font text-lg">{apt.displayTitle}</h3>
                  <div className="flex gap-3 mt-1 text-[9px] font-black text-blue-600 uppercase tracking-widest">
                    <span className="flex items-center gap-1"><Clock size={10} /> {apt.time}</span>
                    <span>•</span>
                    <span>{apt.date}</span>
                  </div>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border ${
                apt.status === 'confirmed' ? 'bg-green-50 border-green-100 text-green-600' : 
                apt.status === 'pending' ? 'bg-amber-50 border-amber-100 text-amber-600' : 'bg-slate-50 border-slate-100 text-slate-400'
              }`}>
                {apt.status}
              </span>
            </button>
          )) : (
            <div className="py-20 text-center border-2 border-dashed border-slate-100 rounded-[3rem]">
              <Inbox className="mx-auto text-slate-200 mb-4" size={40} />
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">No Appointments Found</p>
            </div>
          )}
        </div>

        {/* DETAIL VIEW (Desktop) */}
        <div className="hidden lg:block lg:col-span-5">
          <div className="sticky top-10">
            {selectedAppointment ? (
              <AppointmentDetail data={selectedAppointment} onUpdateStatus={updateStatus} role={userRole} />
            ) : (
              <div className="h-64 border-2 border-dashed border-slate-100 rounded-[3rem] flex flex-col items-center justify-center text-slate-300">
                <p className="text-[9px] font-black uppercase tracking-[0.3em]">Select Entry</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* MOBILE MODAL */}
      {selectedAppointment && (
        <div className="lg:hidden fixed inset-0 z-[60] flex items-end">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setSelectedAppointment(null)} />
          <div className="relative w-full bg-white rounded-t-[3rem] h-[85vh] overflow-hidden flex flex-col animate-in slide-in-from-bottom-full">
            <div className="p-6 overflow-y-auto no-scrollbar">
               <AppointmentDetail data={selectedAppointment} onUpdateStatus={updateStatus} role={userRole} isMobile={true} />
            </div>
            <button onClick={() => setSelectedAppointment(null)} className="m-6 p-4 bg-slate-100 rounded-2xl font-black text-[10px] uppercase tracking-widest">Close</button>
          </div>
        </div>
      )}
    </div>
  );
}