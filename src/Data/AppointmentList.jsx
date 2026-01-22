import React, { useState, useEffect } from 'react';
import { Search, ArrowLeft, Calendar, Clock, MapPin, Phone, X } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import AppointmentDetail from "../components/AppointmentDetailContent"

export default function AppointmentsList() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const appointments = [
    { id: 1, doctorName: "Dr. Maria Elena", specialty: "Cardiology", date: "2026-02-15", time: "10:30 AM", status: "Confirmed", location: "Room 204, Block A" },
    { id: 2, hospitalName: "Sunset Valley Clinic", department: "Surgery", date: "2026-02-16", time: "02:00 PM", status: "Pending", location: "Floor 2, Main Wing" },
    { id: 3, doctorName: "Dr. Sarah Chen", specialty: "Pediatrics", date: "2026-02-18", time: "09:15 AM", status: "Cancelled", location: "Pediatric Wing" },
    { id: 4, hospitalName: "North Star Medical", department: "Cardiology", date: "2026-02-20", time: "11:45 AM", status: "Confirmed", location: "East Gate" },
    { id: 1, doctorName: "Dr. Maria Elena", specialty: "Cardiology", date: "2026-02-15", time: "10:30 AM", status: "Confirmed", location: "Room 204, Block A" },
    { id: 2, hospitalName: "Sunset Valley Clinic", department: "Surgery", date: "2026-02-16", time: "02:00 PM", status: "Pending", location: "Floor 2, Main Wing" },
    { id: 3, doctorName: "Dr. Sarah Chen", specialty: "Pediatrics", date: "2026-02-18", time: "09:15 AM", status: "Cancelled", location: "Pediatric Wing" },
    { id: 4, hospitalName: "North Star Medical", department: "Cardiology", date: "2026-02-20", time: "11:45 AM", status: "Confirmed", location: "East Gate" },
    { id: 1, doctorName: "Dr. Maria Elena", specialty: "Cardiology", date: "2026-02-15", time: "10:30 AM", status: "Confirmed", location: "Room 204, Block A" },
    { id: 2, hospitalName: "Sunset Valley Clinic", department: "Surgery", date: "2026-02-16", time: "02:00 PM", status: "Pending", location: "Floor 2, Main Wing" },
    { id: 3, doctorName: "Dr. Sarah Chen", specialty: "Pediatrics", date: "2026-02-18", time: "09:15 AM", status: "Cancelled", location: "Pediatric Wing" },
    { id: 4, hospitalName: "North Star Medical", department: "Cardiology", date: "2026-02-20", time: "11:45 AM", status: "Confirmed", location: "East Gate" },

  ];

  const getStatusStyles = (status) => {
    if (status === "Confirmed") return "bg-green-50 text-green-600 border-green-100";
    if (status === "Pending") return "bg-amber-50 text-amber-600 border-amber-100";
    if (status === "Cancelled") return "bg-red-50 text-red-600 border-red-100";
    return "bg-gray-50 text-gray-500";
  };

  const filteredAppointments = appointments.filter((item) => {
    const search = searchTerm.toLowerCase();
    return (
      item.doctorName?.toLowerCase().includes(search) ||
      item.hospitalName?.toLowerCase().includes(search) ||
      item.specialty?.toLowerCase().includes(search) ||
      item.department?.toLowerCase().includes(search)
    );
  });

  // THE DETAIL COMPONENT (Matches our Slide-up UI)
  

  return (
    <div className="w-full min-h-screen bg-white">
      {/* Header */}
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
        {/* LIST SECTION */}
        <div className="lg:col-span-7 space-y-4">
          {filteredAppointments.map((appointment) => (
            <div
              key={appointment.id}
              onClick={() => setSelectedAppointment(appointment)}
              className={`p-5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between group ${selectedAppointment?.id === appointment.id ? 'border-blue-500 bg-blue-50/30' : 'border-slate-100 bg-white hover:border-blue-200'
                }`}
            >
              <div className="flex items-center gap-4">
                <div>
                  <h3 className="font-bold text-[#0f172a]">{appointment.hospitalName || appointment.doctorName}</h3>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{appointment.specialty || appointment.department}</p>
                  <div className="flex gap-3 mt-2 text-[10px] font-bold text-blue-500">
                    <span className="flex items-center gap-1"><Calendar size={12} /> {appointment.date}</span>
                    <span className="flex items-center gap-1"><Clock size={12} /> {appointment.time}</span>
                  </div>
                </div>
              </div>
              <div className={`${getStatusStyles(appointment.status)}`} >{appointment.status}</div>

            </div>
          ))}
          {filteredAppointments.length === 0 && (
            <p className="text-center text-slate-400 mt-10 font-medium">No appointments found.</p>
          )}
        </div>

        {/* DESKTOP DETAIL PANEL */}
        <div className="hidden lg:block lg:col-span-5">
          <div className="sticky top-28 h-[550px]">
            {selectedAppointment ? (
              <AppointmentDetail data={selectedAppointment} isMobile={false} />
            ) : (
              <div className="h-full border-2 border-dashed border-slate-100 rounded-2xl flex items-center justify-center text-slate-300 flex-col p-10 text-center">
                <Calendar size={48} className="mb-4 opacity-20" />
                <p className="text-sm font-bold uppercase tracking-widest">Select an appointment to view details</p>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* MOBILE SLIDE-UP SHEET */}
      {selectedAppointment && (
        <div className="lg:hidden fixed inset-0 z-60 flex items-end md:items-center justify-center">
          <div className="absolute inset-0 bg-[#0f172a]/40 backdrop-blur-sm" onClick={() => setSelectedAppointment(null)} />
          <div className="relative h-[80vh] md:h-fit md:max-w-lg w-full scrollUP animate-in slide-in-from-bottom-full duration-500 ease-out shadow-2xl">
            <AppointmentDetail data={selectedAppointment} isMobile={true} />
          </div>
        </div>
      )}
    </div>
  );
}

// Simple Helper Icon
const ChevronRightIcon = () => (
  <div className="p-2 rounded-xl bg-slate-50 text-slate-300 group-hover:text-blue-500 transition-colors">
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
  </div>
);