import React from 'react';
import { Star } from 'lucide-react';

const Departments = () => {
  // Elaborated data structure for Firebase integration
  const departmentData = [
    {
      id: "dept_1",
      name: "Emergency",
      description: "24/7 Critical care and trauma response unit.",
      status: "Open 24/7",
      color: "border-l-red-500"
    },
    {
      id: "dept_2",
      name: "Cardiology",
      description: "Advanced heart health and cardiovascular surgery.",
      status: "By Appt",
      color: "border-l-rose-500"
    },
    {
      id: "dept_3",
      name: "Pediatrics",
      description: "Specialized medical care for infants and children.",
      status: "Open",
      color: "border-l-blue-500"
    },
    {
      id: "dept_4",
      name: "Radiology",
      description: "Diagnostic imaging, MRI, and X-ray services.",
      status: "Open",
      color: "border-l-purple-500"
    },
    {
      id: "dept_5",
      name: "Neurology",
      description: "Brain and nervous system disorder treatments.",
      status: "Limited",
      color: "border-l-amber-500"
    },
    {
      id: "dept_6",
      name: "General",
      description: "Routine checkups and internal medicine.",
      status: "Open",
      color: "border-l-emerald-500"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end border-b border-gray-100 pb-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Hospital Departments</h2>
          <p className="text-xs text-gray-500 font-medium uppercase tracking-widest mt-1">Specialized Medical Wings</p>
        </div>
        <span className="text-[10px] font-black bg-gray-100 px-2 py-1 uppercase">{departmentData.length} Total</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {departmentData.map((dept) => (
          <div 
            key={dept.id} 
            className={`group p-5 bg-white border border-gray-200 border-l-4 ${dept.color} hover:shadow-md transition-all cursor-pointer`}
          >
            <div className="flex justify-between items-start mb-3">
                <Star size={10} fill/>
              <span className={`text-[9px] font-bold px-2 py-0.5 uppercase tracking-tighter ${
                dept.status === 'Open 24/7' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
              }`}>
                {dept.status}
              </span>
            </div>

            <h3 className="font-bold text-gray-900 uppercase tracking-tight mb-1">
              {dept.name}
            </h3>
            
            <p className="text-sm text-gray-500 leading-snug">
              {dept.description}
            </p>

            <div className="mt-4 pt-4 border-t border-gray-50 flex justify-between items-center">
              <span className="text-[10px] font-black text-blue-600 uppercase group-hover:underline">View Specialists →</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Departments;