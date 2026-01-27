import React, { useState, useEffect } from 'react';
import { Search, ArrowLeft, Calendar, Clock, Loader2 } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { db, auth } from '../../firebase.config';
import { ref, onValue, update, query, orderByChild, equalTo, get } from 'firebase/database';
import AppointmentDetail from "../components/AppointmentDetailContent";

export default function AppointmentsList({ userRole }) {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userId = auth.currentUser?.uid;
    if (!userId) return;

    const appointmentsRef = ref(db, 'bookings');
    const isSpecialist = userRole?.toLowerCase() === 'doctor' || userRole?.toLowerCase() === 'hospital';
    const roleKey = isSpecialist ? 'specialistId' : 'patientId';
    
    const q = query(appointmentsRef, orderByChild(roleKey), equalTo(userId));

    const unsubscribe = onValue(q, async (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const appointmentEntries = Object.entries(data);
        
        const listWithNames = await Promise.all(
          appointmentEntries.map(async ([id, value]) => {
            let displayTitle = "";

            // Use the ID check logic for 100% accuracy
            if (value.patientId === userId) {
              // I am the patient, show the doctor's name
              displayTitle = value.specialistName || "Medical Provider";
            } else {
              // I am the doctor, fetch the patient's name
              try {
                const userSnap = await get(ref(db, `users/${value.patientId}`));
                displayTitle = userSnap.exists() ? userSnap.val().name : "Unknown Patient";
              } catch (err) {
                displayTitle = "New Patient Request";
              }
            }

            return { id, ...value, displayTitle };
          })
        );

        setAppointments(listWithNames.reverse());
      } else {
        setAppointments([]);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [userRole]);

  const updateAppointmentStatus = async (appointmentId, newStatus) => {
    try {
      const appointmentRef = ref(db, `bookings/${appointmentId}`);
      await update(appointmentRef, { status: newStatus });
      if (selectedAppointment?.id === appointmentId) {
        setSelectedAppointment(prev => ({ ...prev, status: newStatus }));
      }
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  const getStatusStyles = (status) => {
    const s = status?.toLowerCase();
    const base = "px-3 py-1 rounded-full text-[10px] font-black uppercase border ";
    if (s === "confirmed") return base + "bg-green-50 text-green-600 border-green-100";
    if (s === "pending") return base + "bg-amber-50 text-amber-600 border-amber-100";
    if (s === "cancelled") return base + "bg-red-50 text-red-600 border-red-100";
    return base + "bg-gray-50 text-gray-500 border-gray-100";
  };

  const filteredAppointments = appointments.filter((item) => {
    const search = searchTerm.toLowerCase();
    return (
      item.displayTitle?.toLowerCase().includes(search) ||
      item.specialty?.toLowerCase().includes(search) ||
      item.department?.toLowerCase().includes(search)
    );
  });

  if (loading) return (
    <div className="h-screen flex items-center justify-center">
      <Loader2 className="animate-spin text-blue-600" size={32} />
    </div>
  );

  return (
    <div className="w-full min-h-screen bg-white">
      <header className="px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-4 border-b border-slate-50 sticky top-0 bg-white/90 backdrop-blur-md z-10">
        <div className="flex items-center gap-4 w-full md:w-auto">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-slate-50 rounded-full text-[#0f172a]">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-2xl font-black text-[#0f172a] tracking-tight uppercase">Appointments</h1>
        </div>
        <div className="relative w-full md:w-80">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="text"
            placeholder="Search details..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-50 border border-slate-100 py-3 pl-12 pr-4 rounded-2xl outline-none focus:border-blue-500 transition-all text-sm font-medium"
          />
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 space-y-4">
          {filteredAppointments.map((appointment) => (
            <div
              key={appointment.id}
              onClick={() => setSelectedAppointment(appointment)}
              className={`p-5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between group ${selectedAppointment?.id === appointment.id ? 'border-blue-500 bg-blue-50/30' : 'border-slate-100 bg-white hover:border-blue-200'}`}
            >
              <div className="flex items-center gap-4">
                <div>
                  <h3 className="font-bold text-[#0f172a]">{appointment.displayTitle}</h3>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    {appointment.specialty || appointment.department || "Consultation"}
                  </p>
                  <div className="flex gap-3 mt-2 text-[10px] font-bold text-blue-500">
                    <span className="flex items-center gap-1"><Calendar size={12} /> {appointment.date}</span>
                    <span className="flex items-center gap-1"><Clock size={12} /> {appointment.time}</span>
                  </div>
                </div>
              </div>
              <div className={getStatusStyles(appointment.status)}>{appointment.status}</div>
            </div>
          ))}
        </div>

        <div className="hidden lg:block lg:col-span-5">
          <div className="sticky top-28 h-[550px]">
            {selectedAppointment ? (
              <AppointmentDetail 
                data={selectedAppointment} 
                isMobile={false} 
                onUpdateStatus={updateAppointmentStatus} 
                role={userRole}
              />
            ) : (
              <div className="h-full border-2 border-dashed border-slate-100 rounded-2xl flex items-center justify-center text-slate-300 flex-col p-10 text-center">
                <Calendar size={48} className="mb-4 opacity-20" />
                <p className="text-sm font-bold uppercase tracking-widest">Select an appointment</p>
              </div>
            )}
          </div>
        </div>
      </main>

      {selectedAppointment && (
        <div className="lg:hidden fixed inset-0 z-50 flex items-end justify-center">
          <div className="absolute inset-0 bg-[#0f172a]/40 backdrop-blur-sm" onClick={() => setSelectedAppointment(null)} />
          <div className="relative h-[85vh] w-full animate-in slide-in-from-bottom-full duration-500 ease-out">
            <AppointmentDetail 
              data={selectedAppointment} 
              isMobile={true} 
              isModal={true}
              onClick={() => setSelectedAppointment(null)}
              onUpdateStatus={updateAppointmentStatus}
              role={userRole}
            />
          </div>
        </div>
      )}
    </div>
  );
}