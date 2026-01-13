import React from 'react';
import { User, ChevronRight, Search } from 'lucide-react';

export default function PatientRecords() {
  const patients = [
    { id: "P-990", name: "John Doe", lastVisit: "2 days ago", condition: "Routine Checkup" },
    { id: "P-882", name: "Sarah Smith", lastVisit: "1 week ago", condition: "Hypertension" },
  ];

  return (
    <div className="space-y-6">
      <div className="px-4">
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Patient Directory</h1>
        
        {/* Search Bar for Records */}
        <div className="mt-4 flex items-center bg-gray-100 px-3 py-2 border border-gray-200">
          <Search size={16} className="text-gray-400" />
          <input 
            type="text" 
            placeholder="Search patients..." 
            className="bg-transparent border-none focus:ring-0 text-xs font-medium w-full ml-2"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-y border-gray-200">
              <th className="p-4 text-[10px] font-black uppercase text-gray-400 tracking-widest">Patient</th>
              <th className="p-4 text-[10px] font-black uppercase text-gray-400 tracking-widest">ID</th>
              <th className="p-4 text-[10px] font-black uppercase text-gray-400 tracking-widest">Condition</th>
              <th className="p-4 text-[10px] font-black uppercase text-gray-400 tracking-widest text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((patient) => (
              <tr key={patient.id} className="border-b border-gray-100 hover:bg-blue-50/30 transition-colors cursor-pointer group">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gray-900 text-white flex items-center justify-center text-[10px] font-bold">
                      {patient.name.charAt(0)}
                    </div>
                    <span className="text-sm font-bold text-gray-900 uppercase tracking-tighter">{patient.name}</span>
                  </div>
                </td>
                <td className="p-4 text-xs font-mono text-gray-400">{patient.id}</td>
                <td className="p-4">
                  <span className="text-[10px] font-black bg-blue-100 text-blue-700 px-2 py-0.5 uppercase">
                    {patient.condition}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <button className="text-gray-300 group-hover:text-blue-600 transition-colors">
                    <ChevronRight size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}