import React, { useState } from 'react'; // FIXED: Added this import
import { Search } from "lucide-react";

export default function AppointmentsList() {
  const appointments = [
    { id: 1, hospitalName: "General City Hospital", doctorName: "Dr. Maria Elena", date: "2026-02-15", time: "10:30 AM", status: "Confirmed" },
    { id: 2, hospitalName: "Sunset Valley Clinic", doctorName: "Dr. James Wilson", date: "2026-02-16", time: "02:00 PM", status: "Pending" },
    { id: 3, hospitalName: "St. Jude Children's Hospital", doctorName: "Dr. Sarah Chen", date: "2026-02-18", time: "09:15 AM", status: "Cancelled" },
    { id: 4, hospitalName: "North Star Medical Center", doctorName: "Dr. Robert Fox", date: "2026-02-20", time: "11:45 AM", status: "Confirmed" },
    { id: 5, hospitalName: "Wellness Health Hub", doctorName: "Dr. Arlene McCoy", date: "2026-02-22", time: "04:30 PM", status: "Confirmed" },
  ];

  const getStatusColor = (status) => {
    if (status === "Confirmed") return "text-green-500 bg-green-50";
    if (status === "Pending") return "text-yellow-500 bg-yellow-50";
    if (status === "Cancelled") return "text-red-500 bg-red-50";
    return "text-gray-500 bg-gray-50";
  };

    const [searchTerm, setSearchTerm] = useState("");

  const filteredAppointments = appointments.filter((item) => {
    return (
      item.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.hospitalName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="Appointment-list w-full h-full flex flex-col">
      {/* Header & Search Bar */}
      <div className="top-appiont flex flex-col md:flex-row justify-between items-center gap-6 p-5 md:p-7">
        <h1 className="text-xl md:text-2xl font-bold text-center bg-blue-500 text-white w-full max-w-[320px] md:w-80 h-14 md:h-15 pt-3 rounded-3xl shadow-lg transition-all duration-300 ease-in-out hover:scale-105">
          Appointments List
        </h1>

        <span className="w-full max-w-90 md:w-90 p-2 h-11 md:h-10 rounded-2xl outline-1 outline-gray-400 flex items-center bg-white">
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-2 outline-none bg-transparent"
          />
          <i className="bi bi-search pr-2 text-gray-500"></i>
        </span>
      </div>

      {/* Appointment Cards */}
      <div className="appointment-item w-[90%] h-auto m-auto p-4 flex flex-col items-center">
        {/* FIXED: Changed to filteredAppointments.map */}
        {filteredAppointments.map((appointment) => (
          <div
            key={appointment.id} // FIXED: removed the 's'
            className="appointment-info w-full h-auto flex flex-col md:flex-row justify-between items-start md:items-center p-4 md:p-6 mb-5 shadow-sm rounded-xl bg-white border border-gray-100 hover:outline hover:outline-1 hover:outline-gray-300"
          >
            <div className="hospital-doctor mb-4 md:mb-0">
              <h3 className="font-bold text-lg">{appointment.hospitalName}</h3>
              <p className="text-gray-600">{appointment.doctorName}</p>
            </div>

            <div>
              <p className="text-gray-600">Date: {appointment.date}</p>
              <p className="text-gray-600">Time: {appointment.time}</p>
            </div>

            {/* BONUS: Applied your getStatusColor function here */}
            <p className={`px-4 py-1 rounded-full font-medium ${getStatusColor(appointment.status)}`}>
              {appointment.status}
            </p>
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