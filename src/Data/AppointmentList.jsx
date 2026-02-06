import React, { useState, useEffect } from 'react';
import { Search, Calendar, Clock, Inbox, ArrowLeft, Loader2, UserCheck, Stethoscope } from "lucide-react";
import { db, auth } from '../../firebase.config';
import { ref, onValue, update, get } from 'firebase/database';
import AppointmentDetail from "../components/AppointmentDetailContent";
import toast from 'react-hot-toast';
import { useNavigate, useLocation } from 'react-router-dom';

export default function AppointmentsList({ userRole }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const hide = location.pathname !== '/profile';

  useEffect(() => {
    const userId = auth.currentUser?.uid;
    if (!userId) return;

    const bookingsRef = ref(db, 'bookings');

    // We listen to the whole bookings node to find matches for both roles
    return onValue(bookingsRef, async (snapshot) => {
      const data = snapshot.val();
      if (!data) {
        setAppointments([]);
        setLoading(false);
        return;
      }

      const allBookings = Object.entries(data);

      const list = await Promise.all(
        allBookings
          .filter(([_, value]) => value.specialistId === userId || value.patientId === userId)
          .map(async ([id, value]) => {
            const isIncoming = value.specialistId === userId;
            let displayTitle = "";
            let category = isIncoming ? "Practice" : "Personal";

            if (isIncoming) {
              // Fetch patient name for the doctor
              try {
                const userSnap = await get(ref(db, `users/${value.patientId}`));
                displayTitle = userSnap.exists() ? userSnap.val().name : "Patient";
              } catch {
                displayTitle = "Patient Request";
              }
            } else {
              // It's a personal appointment the specialist booked with someone else
              displayTitle = value.specialistName || "Specialist Visit";
            }

            return { id, ...value, displayTitle, category, isIncoming };
          })
      );

      // Sort by date (newest first)
      setAppointments(list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
      setLoading(false);
    });
  }, []); // Removed userRole dependency to keep it generic for the logged-in ID

  const updateStatus = async (id, status) => {
    try {
      await update(ref(db, `bookings/${id}`), { status });
      toast.success(`Marked as ${status}`);
      if (selectedAppointment?.id === id) setSelectedAppointment(prev => ({ ...prev, status }));
    } catch (e) { toast.error("Update failed"); }
  };

  const filtered = appointments.filter(a =>
    a.displayTitle?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.category?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div className="h-64 flex items-center justify-center"><Loader2 className="animate-spin text-blue-600" /></div>;

  return (
    <div className="w-full p-2 space-y-6">
      {hide && (
        <div>
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
          <ArrowLeft size={24} />
        </button>

        <h1 className="text-2xl font-bold text-slate-900">
          {userRole === 'doctor' ? "Your Schedule" : "Your Appointments"}
        </h1>
        </div>
      )}

      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
        <input
          type="text"
          placeholder="Search patient or provider..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-slate-50 border border-slate-100 py-4 pl-12 pr-4 rounded-2xl outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all text-xs font-bold uppercase tracking-wider"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 space-y-3">
          {filtered.length > 0 ? filtered.map((apt) => (
            <button
              key={apt.id}
              onClick={() => setSelectedAppointment(apt)}
              className={`w-full p-5 rounded-[1rem] border transition-all duration-300 flex items-center justify-between text-left ${selectedAppointment?.id === apt.id
                ? 'border-blue-200 bg-blue-50/30 shadow-sm'
                : 'border-slate-50 bg-white hover:border-slate-200'
                }`}
            >
              <div className="flex gap-4 items-center">
                <div className={`p-3 rounded-2xl ${apt.isIncoming ? 'bg-blue-100 text-blue-600' : 'bg-purple-100 text-purple-600'}`}>
                  {apt.isIncoming ? <UserCheck size={20} /> : <Stethoscope size={20} />}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font text-slate-900 text-lg ">{apt.displayTitle}</h3>

                  </div>
                  <div className="flex gap-3 mt-2 text-[9px] font-black text-slate-400  tracking-widest">
                    <span className="flex items-center gap-1"><Clock size={10} /> {apt.time}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1"><Calendar size={10} /> {apt.date}</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center gap-2">

                <span className={`px-3 py-1 rounded-lg text-[9px] font border ${apt.status === 'confirmed' ? 'bg-green-50 border-green-100 text-green-600' :
                  apt.status === 'pending' ? 'bg-amber-50 border-amber-100 text-amber-600' :
                    'bg-slate-50 border-slate-100 text-slate-400'
                  }`}>
                  {apt.status}
                </span>
                <span className={`text-[8px] px-1.5 py-0.5 rounded-md roboto-font tracking-tighter ${apt.isIncoming ? 'bg-blue-600 text-white' : 'bg-purple-600 text-white'
                  }`}>
                  {apt.category}
                </span>
              </div>

            </button>
          )) : (
            <div className="py-20 text-center border-2 border-dashed border-slate-100 rounded-[3rem]">
              <Inbox className="mx-auto text-slate-200 mb-4" size={40} />
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">No Schedule Found</p>
            </div>
          )}
        </div>

        {/* DETAIL VIEW */}
        <div className="hidden lg:block lg:col-span-5">
          <div className="sticky top-10">
            {selectedAppointment ? (
              <AppointmentDetail
                data={selectedAppointment}
                onUpdateStatus={updateStatus}
                role={selectedAppointment.isIncoming ? 'doctor' : 'patient'}
              />
            ) : (
              <div className="h-64 border-2 border-dashed border-slate-100 rounded-[3.5rem] flex flex-col items-center justify-center text-slate-300">
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
            <div className="overflow-y-auto no-scrollbar flex-1">

              <AppointmentDetail
                data={selectedAppointment}
                onUpdateStatus={updateStatus}
                role={selectedAppointment.isIncoming ? 'doctor' : 'patient'}
                isMobile={true}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}