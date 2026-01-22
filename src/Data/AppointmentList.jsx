import React, { useState } from 'react'; // FIXED: Added this import
import { Search, ArrowLeft } from "lucide-react";

export default function AppointmentsList() {
  const appointments = [
    { id: 1, doctorName: "Dr. Maria Elena", specialty: "Cardiology", date: "2026-02-15", time: "10:30 AM", status: "Confirmed" },
    { id: 2, hospitalName: "Sunset Valley Clinic", department: "Surgery", date: "2026-02-16", time: "02:00 PM", status: "Pending" },
    { id: 3, doctorName: "Dr. Sarah Chen", specialty: "Pediatrics", date: "2026-02-18", time: "09:15 AM", status: "Cancelled" },
    { id: 4, hospitalName: "North Star Medical Center", department: "Cardiology", date: "2026-02-20", time: "11:45 AM", status: "Confirmed" },
    { id: 5, doctorName: "Dr. Arlene McCoy", specialty: "Neurology", date: "2026-02-22", time: "04:30 PM", status: "Confirmed" },
  ];

  const getStatusColor = (status) => {
    if (status === "Confirmed") return "text-green-500 ";
    if (status === "Pending") return "text-yellow-500 ";
    if (status === "Cancelled") return "text-red-500 ";
    return "text-gray-500 bg-gray-50";
  };

  const [searchTerm, setSearchTerm] = useState("");

  const filteredAppointments = appointments.filter((item) => {
    return (
      item.doctorName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.hospitalName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.specialty?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.department?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="Appointment-list w-full h-full flex flex-col">
      {/* Header & Search Bar */}
      <div className="w-full h-auto relative px-4 py-6 flex flex-col md:flex-row justify-between items-center md:items-center  gap-8">
        <ArrowLeft className="absolute left-4 top-6 text-gray-400 cursor-pointer hover:text-gray-600 transition-colors md:static" size={20} />
        <h1 className="text-3xl font-bold text-center  md:pt-0 md:text-left">
          Appointments
        </h1>

        <div className=" mb-8 w-full md:w-1/3">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-gray-50 border border-gray-100 py-4 pl-12 pr-4 rounded-full outline-none focus:ring-2 focus:ring-blue-100 transition-all"
            />
          </div>
        </div>
      </div>

      {/* Appointment Cards */}
      <div className="appointment-item w-[95%] h-auto my-3 m-auto flex space-y-4 flex-col items-center">
        {/* FIXED: Changed to filteredAppointments.map */}
        {filteredAppointments.map((appointment) => (
          <div
            key={appointment.id} // FIXED: removed the 's'
            className="w-full md:w-3/4 bg-white rounded-lg px-4 py-2 flex flex-row justify-between gap-4 shadow-sm"
          >
            <div className="hospital-doctor md:mb-0">
              <h3 className="font-bold text-lg">{appointment.hospitalName || appointment.doctorName}</h3>
              <p className="text-gray-600 ">{appointment.specialty || appointment.department}</p>
              <p className="text-gray-600 text-xs ">{appointment.date}</p>
              <p className="text-gray-600 text-xs">{appointment.time}</p>
            </div>

            <p className={`text-sm  rounded-full font-semibold ${getStatusColor(appointment.status)}`}>
              {appointment.status}
            </p>

            {/* BONUS: Applied your getStatusColor function here */}
          </div>
        ))}

        {/* Show message if no one matches search */}
        {filteredAppointments.length === 0 && (
          <p className="text-gray-500 mt-10">No matches found for "{searchTerm}"</p>
        )}
      </div>
    </div>
  );
}