import React, { useState, useEffect } from 'react';

import { Search, Calendar, Clock, ArrowLeft, X } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import DetailContent from '../components/AppointmentDetailContent';

export default function AppointmentsList() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [details, setDetails] = useState(null);

  // // Prevent background scroll when modal is open on mobile
  // useEffect(() => {
  //   if (details) {
  //     document.body.style.overflow = 'hidden';
  //   } else {
  //     document.body.style.overflow = 'unset';
  //   }
  // }, [details]);

  const appointments = [
    { id: 1, doctorName: "Dr. Maria Elena", specialty: "Cardiology", date: "2026-02-15", time: "10:30 AM", status: "Confirmed", location: "Block A, Room 204" },
    { id: 2, hospitalName: "Sunset Valley Clinic", department: "Surgery", date: "2026-02-16", time: "02:00 PM", status: "Pending", location: "Main Wing, Floor 2" },
    { id: 3, doctorName: "Dr. Sarah Chen", specialty: "Pediatrics", date: "2026-02-18", time: "09:15 AM", status: "Cancelled", location: "Pediatric Center" },
    { id: 4, hospitalName: "North Star Medical Center", department: "Cardiology", date: "2026-02-20", time: "11:45 AM", status: "Confirmed", location: "East Wing" },
    { id: 5, doctorName: "Dr. Arlene McCoy", specialty: "Neurology", date: "2026-02-22", time: "04:30 PM", status: "Confirmed", location: "Neurology Lab" },
  ];


  const getStatusStyle = (status) => {
    if (status === "Confirmed") return "bg-green-50 text-green-600 border-green-100";
    if (status === "Pending") return "bg-amber-50 text-amber-600 border-amber-100";
    if (status === "Cancelled") return "bg-red-50 text-red-600 border-red-100";
    return "bg-gray-50 text-gray-500";
  };

  const filteredAppointments = appointments.filter((item) => {
    const searchStr = searchTerm.toLowerCase();
    return (
      item.doctorName?.toLowerCase().includes(searchStr) ||
      item.hospitalName?.toLowerCase().includes(searchStr) ||
      item.specialty?.toLowerCase().includes(searchStr) ||
      item.department?.toLowerCase().includes(searchStr)
    );
  });



  return (
    <div className="w-full h-full min-h-screen bg-white flex flex-col">
      {/* --- HEADER --- */}
      <div className="sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b border-slate-100 px-6 py-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4 w-full md:w-auto">
            <button onClick={() => navigate(-1)} className="p-2 hover:bg-slate-50 rounded-full transition-colors text-slate-400 hover:text-[#0f172a]">
              <ArrowLeft size={20} />
            </button>
            <h2 className="font-bold text-2xl text-[#0f172a] tracking-tight">Appointments</h2>
          </div>

          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-50 border border-slate-100 py-2.5 pl-10 pr-4 rounded-xl outline-none focus:border-[#0f172a] transition-all text-sm"
            />
          </div>
        </div>
      </div>

      {/* --- MAIN CONTENT --- */}
      <div className="max-w-7xl relative mx-auto w-full p-6 grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* LIST SECTION */}
        <div className="lg:col-span-7 space-y-3">
          {filteredAppointments.map((appointment) => (
            <div
              key={appointment.id}
              onClick={() => setDetails(appointment)}
              className={`group cursor-pointer scrollUP p-4 rounded-xl border transition-all flex items-center justify-between ${details?.id === appointment.id ? "border-blue-600 bg-slate-50" : "border-slate-100 bg-white hover:border-slate-300"
                }`}
            >
              <div className="flex flex-col gap-1">
                <h3 className="font-bold text-slate-900 group-hover:text-[#0f172a]">{appointment.hospitalName || appointment.doctorName}</h3>
                <div className="flex items-center gap-3 text-xs text-slate-500 font-medium">
                  <span className="flex items-center gap-1"><Calendar size={12} /> {appointment.date}</span>
                  <span className="flex items-center gap-1"><Clock size={12} /> {appointment.time}</span>
                </div>
              </div>
              <div className={`text-[10px] uppercase tracking-wider font-bold px-2.5 py-1 rounded-md border ${getStatusStyle(appointment.status)}`}>
                {appointment.status}
              </div>
            </div>
          ))}
        </div>

        {/* DESKTOP SIDEBAR (Visible only on lg screens) */}
        <div className="hidden lg:block lg:col-span-5 relative">
          <div className="sticky  top-28">
            {details ? <DetailContent data={details} isModal={false} /> : (
              <div className="h-100 border-2 border-dashed border-slate-100 rounded-2xl flex flex-col items-center justify-center p-8 text-center">
                <Calendar size={32} className="text-slate-200 mb-4" />
                <h3 className="font-bold text-slate-900">Details</h3>
                <p className="text-sm text-slate-400 mt-2">Select an appointment to view details</p>
              </div>
            )}
          </div>
        </div>

      </div>

      {/* MOBILE POP-UP MODAL (Visible only on small screens when details exist) */}
      {details && (
        <div className="absolute inset-0 z-60 lg:hidden flex items-end pb-5 md:items-center justify-center px-4 ">
          <div className=" absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setDetails(null)} />
          <div className=" w-full md:max-w-lg scrollUP">
            <DetailContent key={details.id} data={details} isModal={true} onClick={()=> setDetails(null)}/>
          </div>
        </div>
      )}
    </div>
  );
}