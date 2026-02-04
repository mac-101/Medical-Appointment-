import React, { useState, useEffect, useMemo } from 'react';
import { Search, ArrowLeft, ChevronRight, Loader2, MapPin } from 'lucide-react';
import { db } from '../../firebase.config';
import { useLocation, useNavigate } from 'react-router-dom';
import { ref, get } from 'firebase/database';
import { DoctorCard } from '../components/doctorCard';

export default function FindDoctors() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(state?.incomingSearch || "");
  const [visibleCount, setVisibleCount] = useState(10);

  // 1. Fetch only Doctors
  useEffect(() => {
    (async () => {
      try {
        const snapshot = await get(ref(db, 'users'));
        if (snapshot.exists()) {
          const raw = Object.entries(snapshot.val()).map(([id, data]) => ({ id, ...data }));
          setDoctors(raw.filter(u => u.role === 'doctor'));
        }
      } catch (e) { console.error(e); }
      setLoading(false);
    })();
  }, []);

  // 2. Multi-Field Filter (Name, Specialty, and Location)
  const filteredResults = useMemo(() => {
    const term = searchTerm.toLowerCase().trim();
    if (!term) return doctors;

    return doctors.filter(doc => 
      doc.name?.toLowerCase().includes(term) ||
      doc.fullName?.toLowerCase().includes(term) ||
      doc.specialty?.toLowerCase().includes(term) ||
      doc.location?.toLowerCase().includes(term)
    );
  }, [searchTerm, doctors]);

  return (
    <div className='w-full min-h-screen bg-[#f8fafc]'>
      {/* MINIMAL SEARCH HEADER */}
      <nav className='sticky top-0 z-30 bg-white/80 backdrop-blur-md px-6 py-6 border-b border-slate-100'>
        <div className='max-w-7xl mx-auto flex items-center gap-4'>
          <button onClick={() => navigate(-1)} className='p-3 hover:bg-slate-100 rounded-2xl text-slate-900 transition-colors'>
            <ArrowLeft size={20} />
          </button>
          <div className='relative flex-1'>
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Search by name, specialty, or city..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className='w-full bg-slate-100 py-4 pl-12 pr-4 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all text-sm font-bold'
            />
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto p-6">
        {loading ? (
          <div className="h-[60vh] flex items-center justify-center">
            <Loader2 className="animate-spin text-blue-600" size={32} />
          </div>
        ) : (
          <div className="space-y-8">
            <div className="flex items-center justify-between px-2">
              <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">
                {searchTerm ? `Results for "${searchTerm}"` : "All Specialists"}
              </h2>
              <span className="text-[10px] font-black text-blue-600 bg-blue-50 px-3 py-1 rounded-lg uppercase">
                {filteredResults.length} Available
              </span>
            </div>

            {/* RESULTS GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {filteredResults.slice(0, visibleCount).map((doc) => (
                <DoctorCard key={doc.id} doc={doc} navigate={() => navigate(`/doctor/${doc.id}`)} />
              ))}
            </div>

            {/* EMPTY STATE */}
            {filteredResults.length === 0 && (
              <div className="text-center py-20 bg-white rounded-[3rem] border border-slate-100">
                <p className="text-slate-400 font-black uppercase text-xs tracking-widest">No doctors found in this category or location.</p>
                <button onClick={() => setSearchTerm("")} className="mt-4 text-blue-600 font-bold text-sm underline">Clear Filters</button>
              </div>
            )}

            {/* PAGINATION */}
            {visibleCount < filteredResults.length && (
              <div className="flex justify-center pb-20">
                <button
                  onClick={() => setVisibleCount(prev => prev + 10)}
                  className="px-10 py-4 bg-slate-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-blue-600 transition-all shadow-xl"
                >
                  Load More Providers
                </button>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}