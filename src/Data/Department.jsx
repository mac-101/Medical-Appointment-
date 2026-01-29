import React, { useState, useEffect } from 'react';
import { db, auth } from '../../firebase.config';
import { ref, onValue } from 'firebase/database';
import { LayoutGrid, Plus, Settings2, Loader2 } from 'lucide-react';

export default function Departments() {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Get current logged-in user ID
    const userId = auth.currentUser?.uid;
    if (!userId) return;

    // 2. Point to the nested departments path
    const profileDeptsRef = ref(db, `users/${userId}/departments`);

    const unsubscribe = onValue(profileDeptsRef, (snapshot) => {
      try {
        if (snapshot.exists()) {
          const data = snapshot.val();
          
          // 3. Normalize data (Firebase sometimes returns objects even for arrays)
          const normalizedData = Array.isArray(data) 
            ? data 
            : Object.entries(data).map(([id, dept]) => ({ 
                id, 
                ...dept 
              }));

          setDepartments(normalizedData);
        } else {
          setDepartments([]);
        }
      } catch (error) {
        console.error("Error syncing profile departments:", error);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  if (loading) return (
    <div className="flex justify-center py-20">
      <Loader2 className="animate-spin text-blue-600" />
    </div>
  );

  return (
    <div className="w-full">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-blue-600 rounded-2xl text-white shadow-lg shadow-blue-200">
            <LayoutGrid size={24} />
          </div>
          <div>
            <h2 className="text-xl font-black text-slate-900 tracking-tight uppercase">My Departments</h2>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Manage your hospital wings</p>
          </div>
        </div>
        
        <button className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 transition-colors">
          <Plus size={16} /> Add New
        </button>
      </div>

      {/* Departments Grid */}
      {departments.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {departments.map((dept, index) => (
            <div key={dept.id || index} className="group relative bg-white border border-slate-100 p-6 rounded-[2rem] hover:border-blue-500 transition-all">
              <div className="flex justify-between items-start mb-4">
                <span className="text-[10px] font-black px-3 py-1 bg-slate-50 text-slate-500 rounded-full uppercase tracking-tighter">
                  {dept.status || 'Active'}
                </span>
                <button className="text-slate-300 hover:text-blue-600 transition-colors">
                  <Settings2 size={18} />
                </button>
              </div>

              <h3 className="text-lg font-bold text-slate-900 mb-1">{dept.name}</h3>
              <p className="text-xs text-slate-500 leading-relaxed line-clamp-2 mb-4">
                {dept.description || "No description provided for this department."}
              </p>

              <div className="flex items-center gap-4 pt-4 border-t border-slate-50">
                <div className="flex -space-x-2">
                   {/* Placeholder for Specialist Avatars */}
                  <div className="w-6 h-6 rounded-full bg-blue-100 border-2 border-white" />
                  <div className="w-6 h-6 rounded-full bg-slate-100 border-2 border-white" />
                </div>
                <span className="text-[9px] font-bold text-slate-400 uppercase">Registered Specialists</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-20 text-center bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-200">
          <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">No departments found in your profile</p>
          <button className="mt-4 text-blue-600 text-sm font-black hover:underline">Click here to get started</button>
        </div>
      )}
    </div>
  );
}