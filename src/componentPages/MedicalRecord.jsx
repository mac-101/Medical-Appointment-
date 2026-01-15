import React from 'react';
import { FileText, Download, Activity, Calendar } from 'lucide-react';

export default function MedicalRecords() {
  // Structure this as a constant for easy Firebase integration
  const records = [
    { id: 1, title: "Blood Test Report", date: "Jan 12, 2026", hospital: "City General", type: "PDF" },
    { id: 2, title: "X-Ray Results", date: "Dec 20, 2025", hospital: "Radiology Center", type: "DICOM" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center px-4">
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Medical Records</h1>
        <button className="text-[10px] font-black uppercase text-blue-600 hover:underline">Sync Data +</button>
      </div>

      {records.length > 0 ? (
        <div className="grid gap-3 px-4">
          {records.map((record) => (
            <div key={record.id} className="flex items-center justify-between p-4 bg-white border border-gray-200 hover:border-blue-400 transition-colors">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-blue-50 text-blue-600">
                  <FileText size={20} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-900 uppercase tracking-tight">{record.title}</h3>
                  <p className="text-[10px] text-gray-500 font-medium uppercase tracking-widest mt-1">
                    {record.hospital} • {record.date}
                  </p>
                </div>
              </div>
              <button className="p-2 hover:bg-gray-100 border border-gray-100">
                <Download size={16} className="text-gray-400" />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="mx-4 p-12 bg-gray-50 border-2 border-dashed border-gray-200 text-center">
          <Activity className="mx-auto text-gray-300 mb-3" size={32} />
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
            No medical records found. 
          </p>
          <p className="text-[10px] text-gray-400 mt-1">Please sync with your primary hospital.</p>
        </div>
      )}
    </div>
  );
}